import React, { ReactElement } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { AppState } from './reducers';
import CustomDropdownToggle from './customDropdownToggle';
import { ProfileRTLAlignstate } from './types';
import { VerseIdParser } from './verseIdParser';
//import { updateUserProfileBooleanAction } from './actions';

export const SelectAlignmentDirectionComp = (profile: ProfileRTLAlignstate): ReactElement => {
  const dispatch = useDispatch();
  const {
    isNTrtlAlignSource,
    isOTrtlAlignSource,
    isNTltrAlignSource,
    isOTltrAlignSource,
    isNTrtlAlignTarget,
    isOTrtlAlignTarget,
    isNTltrAlignTarget,
    isOTltrAlignTarget,
    isRTL,
    verseCode,
    uid,
    iconPosition,
    reverseAlignmentDisplay,
    clearLinkSelectionsFunc,
  } = profile;

  // clear out any existing links
  clearLinkSelectionsFunc();

  // are we in OT or NT?
  const verseIdParser = new VerseIdParser();
  const testament = verseIdParser.isNT(verseCode) ? 'nt' : 'ot';
  let rtlClass = 'rtl';
  let dirClass = '';
  let dirValue = true;

  let corpus = 'Target'; // keep track of the state variable we need to change
  if (reverseAlignmentDisplay && iconPosition === 'top') {
    corpus = 'Source';
  } else if (reverseAlignmentDisplay !== true && iconPosition === 'top') {
    corpus = 'Target';
  } else if (reverseAlignmentDisplay && iconPosition === 'bottom') {
    corpus = 'Target';
  } else if (reverseAlignmentDisplay !== true && iconPosition === 'bottom') {
    corpus = 'Source';
  }

  if (corpus === 'Source') {
    if (isRTL) {
      dirValue = true;
      dirClass = 'fas fa-align-left';
      // right to left direction 'fa-align-left' (reverse)
      if (testament === 'ot' && isOTrtlAlignSource === true) {
        dirClass = 'fas fa-align-right';
        dirValue = false;
      } else if (testament === 'nt' && isNTrtlAlignSource === true) {
        dirClass = 'fas fa-align-right';
        dirValue = false;
      }
    } else {
      dirValue = true;
      rtlClass = 'ltr';
      dirClass = 'fas fa-align-right';
      // left to right direction 'fa-align-right' (reverse)
      if (testament === 'ot' && isOTltrAlignSource === true) {
        dirClass = 'fas fa-align-left';
        dirValue = false;
      } else if (testament === 'nt' && isNTltrAlignSource === true) {
        dirClass = 'fas fa-align-left';
        dirValue = false;
      }
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (isRTL) {
      dirValue = true;
      dirClass = 'fas fa-align-left';
      // right to left direction 'fa-align-left' (reverse)
      if (testament === 'ot' && isOTrtlAlignTarget === true) {
        dirClass = 'fas fa-align-right';
        dirValue = false;
      } else if (testament === 'nt' && isNTrtlAlignTarget === true) {
        dirClass = 'fas fa-align-right';
        dirValue = false;
      }
    } else {
      dirValue = true;
      rtlClass = 'ltr';
      dirClass = 'fas fa-align-right';
      // left to right direction 'fa-align-right' (reverse)
      if (testament === 'ot' && isOTltrAlignTarget === true) {
        dirClass = 'fas fa-align-left';
        dirValue = false;
      } else if (testament === 'nt' && isNTltrAlignTarget === true) {
        dirClass = 'fas fa-align-left';
        dirValue = false;
      }
    }
  }

  return (
    <Dropdown
      key="switch-direction"
      className="switch-direction"
      onClick={(): void => {
        console.log("We should be updating the profile to switch text direction, but it is disabled.")
        //dispatch(
          //updateUserProfileBooleanAction(
            //uid,
            //`is${testament.toUpperCase()}${rtlClass}Align${corpus}`,
            //dirValue,
          //),
        //);
      }}
    >
      <Dropdown.Toggle id="interlinear-dropdown-custom-components" as={CustomDropdownToggle}>
        <OverlayTrigger
          key="switch-direction"
          trigger={['hover', 'focus']}
          placement="right"
          // prettier-ignore
          overlay={(
            <Tooltip id="tooltip-select-interlinear">
              <FormattedMessage id="switchDirection" />
            </Tooltip>
        )}
        >
          <i className={dirClass} />
        </OverlayTrigger>
      </Dropdown.Toggle>
    </Dropdown>
  );
};

/* istanbul ignore next */
export const mapStateToProps = (state: AppState): any => {
  return {
    isNTrtlAlignSource: state.profile?.isNTrtlAlignSource ?? false,
    isOTrtlAlignSource: state.profile?.isOTrtlAlignSource ?? false,
    isNTltrAlignSource: state.profile?.isNTltrAlignSource ?? false,
    isOTltrAlignSource: state.profile?.isOTltrAlignSource ?? false,
    isNTrtlAlignTarget: state.profile?.isNTrtlAlignTarget ?? false,
    isOTrtlAlignTarget: state.profile?.isOTrtlAlignTarget ?? false,
    isNTltrAlignTarget: state.profile?.isNTltrAlignTarget ?? false,
    isOTltrAlignTarget: state.profile?.isOTltrAlignTarget ?? false,
    uid: state.auth?.user ? state.auth.user.uid : '',
    reverseAlignmentDisplay: state.alignment?.reverseAlignmentDisplay ?? false,
  };
};

export const mapDispatchToProps = (): any => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectAlignmentDirectionComp);
