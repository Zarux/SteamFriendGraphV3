import React from "react";
import clsx from "clsx";
import {Typography} from "@material-ui/core";
import useGlobalStyles from "../../styles";
import {Checkbox} from "@material-ui/core";

type Props = {
    label: string
    value: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const BooleanSetting = ({label, value, onChange}: Props) => {
    const classes = useGlobalStyles();
    return (
        <div className={clsx(classes.margin, classes.drawerItem, classes.flex)}>
            <Typography
                className={classes.text}
                id="checkbox-setting"
                style={{width: "90%", lineHeight: "23px"}}
            >
                {label}
            </Typography>
            <Checkbox
                style={{padding: 0}}
                checked={value}
                onChange={onChange}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />

        </div>
    )
}

export default BooleanSetting