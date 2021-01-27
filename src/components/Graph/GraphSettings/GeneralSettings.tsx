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
                expandIcon={<ExpandMoreIcon />}
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
                        handleChange={handleChange("timeoutMultiplier")}
                        handleSliderChange={handleSliderChange("timeoutMultiplier")}
                    />
                </ListItem>

            </List>
        </Accordion>
    )
}

export default GeneralSettings