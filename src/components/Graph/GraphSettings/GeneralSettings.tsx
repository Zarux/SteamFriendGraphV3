import React from 'react'
import {Accordion, AccordionSummary, Divider, List, ListItem} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SliderSetting from "./SettingComponents/SliderSetting";
import {GSettings} from "../../../types/types";
import useGlobalStyles from "../styles";
import BooleanSetting from "./SettingComponents/BooleanSetting";
import NumberSetting from "./SettingComponents/NumberSetting";


type Props = {
    settings: GSettings
    handleChange: (prop: keyof GSettings) => (event: React.ChangeEvent<HTMLInputElement>) => void
    handleSliderChange: (prop: keyof GSettings) => (event: any, newValue: number | number[]) => void
}

const GeneralSettings = ({settings, handleChange, handleSliderChange}: Props) => {
    const classes = useGlobalStyles();
    return (
        <Accordion
            defaultExpanded
            className={classes.accordionBg}
        >
            <AccordionSummary
                aria-controls="general-settings-content"
                id="general-settings-header"
                expandIcon={<ExpandMoreIcon/>}
                style={{minHeight: 0}}
            >
                <span className={classes.text}>General settings</span>
            </AccordionSummary>
            <Divider/>
            <List>
                <ListItem className={classes.compactListItem}>
                    <SliderSetting
                        label="Layout timeout multiplier"
                        value={settings.timeoutMultiplier}
                        min={0}
                        max={10}
                        onChange={handleChange("timeoutMultiplier")}
                        onSliderChange={handleSliderChange("timeoutMultiplier")}
                    />
                </ListItem>
                <ListItem className={classes.compactListItem}>
                    <BooleanSetting
                        label="Run layout in background"
                        value={settings.background}
                        onChange={handleChange("background")}
                    />
                </ListItem>
                <ListItem className={classes.compactListItem}>
                    <NumberSetting
                        label="Minimum node size"
                        value={settings.minNodeSize}
                        onChange={handleChange("minNodeSize")}
                    />
                </ListItem>
                <ListItem className={classes.compactListItem}>
                    <NumberSetting
                        label="Max node size"
                        value={settings.maxNodeSize}
                        onChange={handleChange("maxNodeSize")}
                    />
                </ListItem>
                <ListItem className={classes.compactListItem}>
                    <NumberSetting
                        label="Size threshold for labels"
                        value={settings.labelThreshold}
                        onChange={handleChange("labelThreshold")}
                    />
                </ListItem>
            </List>
        </Accordion>
    )
}

export default GeneralSettings