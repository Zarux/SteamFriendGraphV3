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

const AdvancedSettings = ({settings, handleChange, handleSliderChange}: Props) => {
    const classes = useGlobalStyles();
    return (
        <Accordion
            className={classes.accordionBg}
        >
            <AccordionSummary
                aria-controls="advanced-settings-content"
                id="advanced-settings-header"
                expandIcon={<ExpandMoreIcon/>}

            >
                <span className={classes.text}>Advanced settings (that can mess up the graph)</span>
            </AccordionSummary>
            <Divider/>
            <List>
                <ListItem className={classes.compactListItem}>
                    <SliderSetting
                        label="Barnes-Hut ϴ"
                        value={settings.barnesHutTheta}
                        min={0}
                        max={1.5}
                        step={0.1}
                        onChange={handleChange("barnesHutTheta")}
                        onSliderChange={handleSliderChange("barnesHutTheta")}
                    />
                </ListItem>
                <ListItem>
                    <SliderSetting
                        label="Gravity"
                        value={settings.gravity}
                        min={0}
                        max={10}
                        step={0.5}
                        onChange={handleChange("gravity")}
                        onSliderChange={handleSliderChange("gravity")}
                    />
                </ListItem>
                <ListItem className={classes.compactListItem}>
                    <SliderSetting
                        label="Scaling ratio"
                        value={settings.scalingRatio}
                        min={1}
                        max={10}
                        onChange={handleChange("scalingRatio")}
                        onSliderChange={handleSliderChange("scalingRatio")}
                    />
                </ListItem>
                <ListItem className={classes.compactListItem}>
                    <BooleanSetting
                        label="Lin-log mode"
                        value={settings.linLogMode}
                        onChange={handleChange("linLogMode")}
                    />
                </ListItem>
                <ListItem className={classes.compactListItem}>
                    <BooleanSetting
                        label="Strong gravity"
                        value={settings.strongGravityMode}
                        onChange={handleChange("strongGravityMode")}
                    />
                </ListItem>
                <ListItem className={classes.compactListItem}>
                    <BooleanSetting
                        label="Allow graph to expand outside container"
                        value={settings.scalingModeOutside}
                        onChange={handleChange("scalingModeOutside")}
                    />
                </ListItem>
                {
                    !settings.background &&
                    <ListItem className={classes.compactListItem}>
                        <NumberSetting
                            label="Iterations before first render"
                            value={settings.startingIterations}
                            onChange={handleChange("startingIterations")}
                        />
                    </ListItem>
                }
                {
                    !settings.background &&
                    <ListItem className={classes.compactListItem}>
                        <NumberSetting
                            label="Iterations per render"
                            value={settings.iterationsPerRender}
                            onChange={handleChange("iterationsPerRender")}
                        />
                    </ListItem>
                }
            </List>
        </Accordion>
    )
}

export default AdvancedSettings