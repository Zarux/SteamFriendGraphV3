import React from "react";
import {CircularProgress, createStyles, makeStyles, Theme} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check'
import useGlobalStyles from "../styles";
import clsx from "clsx";

type Props = {
    label: string
    timeout?: number
    complete: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "7px",
        },
        label: {
            float: "left"
        },
        progress: {
            float: "right"
        }
    }),
);

const ProgressIndicator = ({label, timeout, complete}: Props) => {
    const classes = useStyles()
    const globalClasses = useGlobalStyles()

    return (
        <div className={clsx(classes.root, globalClasses.text, globalClasses.drawerItem)}>
            <div className={classes.label} style={{lineHeight: "24px"}}>
                {label}
            </div>
            <div className={classes.progress}>
                {
                    complete &&
                    <CheckIcon style={{color: "green"}}/>
                }
                {
                    !complete &&
                    <CircularProgress
                        size={25}
                    />
                }
            </div>
        </div>
    )
}

export default ProgressIndicator