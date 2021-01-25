import {Input, Slider, Typography} from "@material-ui/core";
import React from "react";
import useStyles from "../styles";

type SliderSettingProps = {
    label: string
    value: number
    handleSliderChange: (event: any, newValue: number | number[]) => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    min: number
    max: number
    step?: number
}

const SliderSetting = ({label, value, handleSliderChange, handleChange, min, max, step}: SliderSettingProps) => {
    const classes = useStyles();
    return <div className={classes.margin}>
        <Typography className={classes.text} id="discrete-slider-min-degree">
            {label}
        </Typography>
        <Slider
            style={{
                width: "80%"
            }}
            value={value}
            step={step}
            valueLabelDisplay="off"
            min={min}
            max={max}
            aria-labelledby="discrete-slider-min-degree"
            onChange={handleSliderChange}
        />
        <Input
            className={classes.text}
            style={{
                width: "15%",
                verticalAlign: "top",
                marginLeft: "2%"
            }}
            value={value}
            onChange={handleChange}
            margin="dense"
            inputProps={{
                step: step,
                min: min,
                max: max,
                type: 'number',
                'aria-labelledby': 'discrete-slider-min-degree',
            }}
        />
    </div>
}

export default SliderSetting