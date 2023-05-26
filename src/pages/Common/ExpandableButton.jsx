import React from "react";
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import classNames from 'classnames';

export const ExpendableButton = ({ isOpen, toggle }) => {
	const { darkModeStatus } = useDarkMode();
  return (
    <Button
    // isOutline={!darkModeStatus}
    // color='dark'
    isLight={darkModeStatus}
    className={classNames('text-nowrap', {
        'border-light': !darkModeStatus,
    })}
    style={{ transition: "all 0.25s"}}
    icon={isOpen? "ArrowDropDown":"ArrowRight"}
    onClick={toggle}>
   
</Button>
  );
};