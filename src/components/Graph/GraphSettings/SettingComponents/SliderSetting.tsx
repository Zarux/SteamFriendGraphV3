import {Input, Slider, Typography} from "@material-ui/core";
import React from "react";
import useGlobalStyles from "../../styles";
import clsx from "clsx";

type SliderSettingProps = {
    label: string
    value: number
    onSliderChange: (event: any, newValue: number | number[]) => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    min: number
    max: number
    step?: number
}

const SliderSetting = ({label, value, onSliderChange, onChange, min, max, step}: SliderSettingProps) => {
    const classes = useGlobalStyles();
    return (
        <div className={clsx(classes.margin, classes.drawerItem)}>
            <Typography className={classes.text} id="discrete-slider">
                {label}
            </Typography>
            <Slider
                style={{
                    width: "80%",
                    marginLeft: "1%"
                }}
                value={value}
                step={step}
                valueLabelDisplay="off"
                min={min}
                max={max}
                aria-labelledby="discrete-slider"
                onChange={onSliderChange}
            />
            <Input
                className={classes.text}
                style={{
                    width: "14%",
                    verticalAlign: "top",
                    marginLeft: "5%"
                }}
                value={value}
                onChange={onChange}
                margin="dense"
                inputProps={{
                    step: step,
                    min: min,
                    type: 'number',
                    'aria-labelledby': 'discrete-slider',
                    style: {textAlign: "center"}
                }}
            />
        </div>
    )
}

export default SliderSetting