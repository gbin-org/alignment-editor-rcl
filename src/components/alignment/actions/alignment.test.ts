/* eslint-disable no-throw-literal */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './alignment';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

const errorText = 'This is an error text.';
const errorString = 'This is an error string.';
const errorArray = [errorText];

let userConditions: string[] = []; // returnNull | error | errorString | errorArray
let failAlignmentData = false;

jest.disableAutomock();

jest.mock('../lib/firebase/firebase.auth', (): any => {
  const userData = {
    email: 'test@gmail.com',
    uid: 123,
  };

  return jest.fn().mockImplementation((): any => {
    return {
      constructor: jest.fn(),
      init: jest.fn().mockReturnThis(),
      getCurrentSignedInUser: jest.fn().mockImplementation((): any => {
        const condition = userConditions.pop();

        if (condition === 'returnNull') {
          return null;
        }

        if (condition === 'error') {
          throw new Error(errorText);
        }

        if (condition === 'errorString') {
          throw new Error(errorString);
        }

        if (condition === 'errorArray') {
          throw new Error(errorArray.toString());
        }

        return Promise.resolve(userData);
      }),
    };
  });
});

jest.mock('../lib/firebase/firebase.database', (): any => {
  return jest.fn().mockImplementation((): any => {
    return {
      constructor: jest.fn(),
      init: jest.fn().mockReturnThis(),
      getTranslationVerseData: jest.fn().mockImplementation((): any => {
        if (failAlignmentData) {
          return Promise.reject(Error('Reference data failure.'));
        }
        return Promise.resolve({ data: { links: [] } });
      }),
      subscribeToTranslationVerse: jest.fn().mockImplementation((): any => {
        if (failAlignmentData) {
          return Promise.reject(Error('Reference data failure.'));
        }
        return Promise.resolve({});
      }),
    };
  });
});

describe('Alignment actions', (): void => {
  beforeEach((): void => {
    userConditions = [];
    store.clearActions();
  });

  beforeAll((): void => {
    jest.restoreAllMocks();
  });

  afterAll((): void => {
    jest.restoreAllMocks();
  });

  it('should create an action of FETCH_ALIGNMENT_DATA_REQUEST', (): void => {
    store.dispatch(actions.fetchAlignmentDataRequestAction('projectId', 'verseId'));
    const receives = store.getActions();
    expect(receives.pop().type).toEqual(types.FETCH_ALIGNMENT_DATA_REQUEST);
  });

  it('should create an action of FETCH_ALIGNMENT_DATA_FAILURE', (): void => {
    store.dispatch(actions.fetchAlignmentDataFailureAction('error!'));
    const receives = store.getActions();
    expect(receives.pop().type).toEqual(types.FETCH_ALIGNMENT_DATA_FAILURE);
  });

  it('should create an action of FETCH_ALIGNMENT_DATA_SUCCESS', (): void => {
    store.dispatch(actions.fetchAlignmentDataSuccessAction('projectId', 'verseId', {}));
    const receives = store.getActions();
    expect(receives.pop().type).toEqual(types.FETCH_ALIGNMENT_DATA_SUCCESS);
  });

  it('should create an action of UPDATE_ALIGNMENT_DATA', (): void => {
    const mockDoc = {
      data: (): any => {
        return { links: [] };
      },
    };
    store.dispatch(actions.updateAlignmentData(mockDoc, 'verseId'));
    const receives = store.getActions();
    expect(receives.pop().type).toEqual(types.UPDATE_ALIGNMENT_DATA);
  });

  it('should create an action of ADD_LINK', (): void => {
    store.dispatch(actions.addLinkAction('verseId', [], []));
    const receives = store.getActions();
    expect(receives.pop().type).toEqual(types.ADD_LINK);
  });

  it('should create an action of REVERSE_ALIGNMENT_DISPLAY', (): void => {
    store.dispatch(actions.reverseAlignmentDisplayAction());
    const receives = store.getActions();
    expect(receives.pop().type).toEqual(types.REVERSE_ALIGNMENT_DISPLAY);
  });

  describe('Fetch alignment data', (): void => {
    it('Failure occurs if user is not signed in', async (): Promise<void> => {
      userConditions.push('returnNull');
      await store.dispatch(actions.fetchAlignmentDataAction('projectId', 'verseId'));

      const receives = store.getActions();

      let lastAction = receives.pop();
      expect(lastAction.type).toBe(types.FETCH_ALIGNMENT_DATA_FAILURE);
      expect(lastAction.error.toLowerCase().startsWith('you must be signed')).toBe(true);

      lastAction = receives.pop();
      expect(lastAction.type).toBe(types.FETCH_ALIGNMENT_DATA_REQUEST);
    });

    it('Success occurs if user is signed-in  ', async (): Promise<any> => {
      failAlignmentData = false;
      await store.dispatch(actions.fetchAlignmentDataAction('projectId', 'verseId'));

      const receives = store.getActions();

      let lastAction = receives.pop();
      expect(lastAction.type).toBe(types.FETCH_ALIGNMENT_DATA_SUCCESS);

      lastAction = receives.pop();
      expect(lastAction.type).toBe(types.FETCH_ALIGNMENT_DATA_REQUEST);
    });

    it('Failure occurs when user is signed-in (due to database) ', async (): Promise<any> => {
      failAlignmentData = true;
      await store.dispatch(actions.fetchAlignmentDataAction('projectId', 'verseId'));

      const receives = store.getActions();

      let lastAction = receives.pop();
      expect(lastAction.type).toBe(types.FETCH_ALIGNMENT_DATA_FAILURE);

      lastAction = receives.pop();
      expect(lastAction.type).toBe(types.FETCH_ALIGNMENT_DATA_REQUEST);
    });
  });
});
