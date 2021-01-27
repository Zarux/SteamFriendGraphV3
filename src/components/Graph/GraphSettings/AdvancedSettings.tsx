import React from 'react'
import {Accordion, AccordionSummary, Divider, List, ListItem} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SliderSetting from "./SettingComponents/SliderSetting";
import {GSettings} from "../../../types/types";
import useGlobalStyles from "../styles";


type Props = {
    settings: GSettings
    handleChange: (prop: keyof GSettings) => (event: React.ChangeEvent<HTMLInputElement>) => void
    handleSliderChange: (prop: keyof GSettings) => (event: any, newValue: number | number[]) => void
}

const AdvancedSettings = ({settings, handleChange, handleSliderChange}: Props) => {
    const classes = useGlobalStyles();
    return (
        <Accordion
            style={{
                backgroundColor: "inherit"
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{minHeight: 0}}
            >
                <span className={classes.text}>Advanced settings</span>
            </AccordionSummary>
            <Divider/>
            <List>
                <ListItem className={classes.compactListItem}>
                    <SliderSetting
                        label="Barnes-Hut ϴ"
                        value={settings.barnesHutTheta}
                        min={0}
                        max={2}
                        step={0.1}
                        handleChange={handleChange("barnesHutTheta")}
                        handleSliderChange={handleSliderChange("barnesHutTheta")}
                    />
                </ListItem>
                <ListItem>
                    <SliderSetting
                        label="Gravity"
                        value={settings.gravity}
                        min={0}
                        max={5}
                        step={0.2}
                        handleChange={handleChange("gravity")}
                        handleSliderChange={handleSliderChange("gravity")}
                    />
                </ListItem>
                <ListItem className={classes.compactListItem}>
                    <SliderSetting
                        label="Scaling ratio"
                        value={settings.scalingRatio}
                        min={1}
                        max={10}
                        handleChange={handleChange("scalingRatio")}
                        handleSliderChange={handleSliderChange("scalingRatio")}
                    />
                </ListItem>
            </List>
        </Accordion>
    )
}

export default AdvancedSettings