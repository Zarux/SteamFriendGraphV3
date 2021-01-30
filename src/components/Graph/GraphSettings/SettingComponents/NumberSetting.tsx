import React from "react";
import clsx from "clsx";
import {Input, Typography} from "@material-ui/core";
import useGlobalStyles from "../../styles";

type Props = {
    label: string
    value: number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const NumberSetting = ({label, value, onChange}: Props) => {
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
            <Input
                className={classes.text}
                value={value}
                onChange={onChange}
                style={{
                    width: "14%",
                    verticalAlign: "top",
                    marginLeft: "5%"
                }}
                inputProps={{
                    min: 0,
                    type: 'number',
                    'aria-labelledby': 'checkbox-setting',
                    style: {textAlign: "center"}
                }}
            />

        </div>
    )
}

export default NumberSetting