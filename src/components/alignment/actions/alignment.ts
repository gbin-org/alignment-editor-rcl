import * as _ from 'lodash';
import * as types from '../types/alignment';
//import firebase from '../lib/firebase';
//import errorMessageExtractor from './errorMessageExtractor';
import { SelectedTextSegment } from '../structs/textSegment';

//const FirebaseDb = firebase.createService('db');
//const FirebaseAuth = firebase.createService('auth');

export const fetchAlignmentDataRequestAction = (
  projectId: string,
  verseCode: string,
): types.AlignmentActionTypes => {
  return {
    type: types.FETCH_ALIGNMENT_DATA_REQUEST,
    projectId,
    verseCode,
  };
};

export const fetchAlignmentDataFailureAction = (error: string): types.AlignmentActionTypes => {
  return {
    type: types.FETCH_ALIGNMENT_DATA_FAILURE,
    error,
  };
};

export const fetchAlignmentDataSuccessAction = (
  projectId: string,
  verseCode: string,
  data: any,
): types.AlignmentActionTypes => {
  return {
    type: types.FETCH_ALIGNMENT_DATA_SUCCESS,
    projectId,
    verseCode,
    data,
  };
};

export const selectSourceTextSegmentAction = (position: number): types.AlignmentActionTypes => {
  return {
    type: types.SELECT_SOURCE_TEXT_SEGMENT,
    position,
  };
};

export const selectTargetTextSegmentAction = (position: number): types.AlignmentActionTypes => {
  return {
    type: types.SELECT_TARGET_TEXT_SEGMENT,
    position,
  };
};

export const deSelectSourceTextSegmentAction = (position: number): types.AlignmentActionTypes => {
  return {
    type: types.DESELECT_SOURCE_TEXT_SEGMENT,
    position,
  };
};

export const deSelectTargetTextSegmentAction = (position: number): types.AlignmentActionTypes => {
  return {
    type: types.DESELECT_TARGET_TEXT_SEGMENT,
    position,
  };
};

export const addLinkAction = (
  verseCode: string,
  sources: number[],
  targets: number[],
): types.AlignmentActionTypes => {
  return {
    type: types.ADD_LINK,
    verseCode,
    sources,
    targets,
  };
};

export const clearLinkSelectionsAction = (): types.AlignmentActionTypes => {
  return {
    type: types.CLEAR_LINK_SELECTION,
  };
};

export const removeSelectedLinkAction = (
  verseCode: string,
  sourceAlt: SelectedTextSegment[],
  targetAlt: SelectedTextSegment[],
): types.AlignmentActionTypes => {
  return {
    type: types.REMOVE_LINK,
    verseCode,
    sourceAlt,
    targetAlt,
  };
};

export const reverseAlignmentDisplayAction = (): types.AlignmentActionTypes => {
  return {
    type: types.REVERSE_ALIGNMENT_DISPLAY,
  };
};

export const selectLinkAction = (): types.AlignmentActionTypes => {
  return {
    type: types.SELECT_LINK,
  };
};

export const updateAlignmentData = (doc: any, verseCode: string): types.AlignmentActionTypes => {
  const alignmentData = doc.data();
  alignmentData.links = _.uniqWith(alignmentData.links, _.isEqual);
  return {
    type: types.UPDATE_ALIGNMENT_DATA,
    verseCode,
    alignmentData,
  };
};

export const updateAlignmentDataAction = (dispatch: any, verseCode: string, doc: any): any => {
  dispatch(updateAlignmentData(doc, verseCode));
};

export const fetchAlignmentDataAction = (projectId: string, verseCode: string): any => {
  return async (dispatch: any): Promise<any> => {
    //try {
      //dispatch(fetchAlignmentDataRequestAction(projectId, verseCode));
      //const currentUser = await (await FirebaseAuth.init()).getCurrentSignedInUser();

      //if (currentUser && Object.prototype.hasOwnProperty.call(currentUser, 'uid')) {
        //const result = await (await FirebaseDb.init()).getTranslationVerseData(
          //currentUser.uid,
          //projectId,
          //verseCode,
        //);
        //result.data.links = _.uniqBy(result.data.links, _.isEqual);
        //dispatch(fetchAlignmentDataSuccessAction(projectId, verseCode, result.data));
        //await (await FirebaseDb.init()).subscribeToTranslationVerse(
          //projectId,
          //verseCode,
          //updateAlignmentDataAction.bind(null, dispatch, verseCode),
        //);
      //} else {
        //throw new Error(types.USER_IS_NOT_SIGNED);
      //}
    //} catch (error) {
      //const errorMessage = errorMessageExtractor(error);
      //if (errorMessage === types.USER_IS_NOT_SIGNED) {
        //dispatch(
          //fetchAlignmentDataFailureAction(`You must be signed in to access alignment data.`),
        //);
      //} else {
        //dispatch(fetchAlignmentDataFailureAction(errorMessage));
      //}
    //}
  //};
    dispatch(fetchAlignmentDataSuccessAction('1', '01001001', {}));
  };
};

export const reRenderLinksAction = (): types.AlignmentActionTypes => {
  return {
    type: types.RE_RENDER_LINKS,
  };
};
