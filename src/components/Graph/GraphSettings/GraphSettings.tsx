import {
    IconButton, Drawer, Divider, FormControl,
    OutlinedInput, InputAdornment, Button, List, ListItem
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from "@material-ui/icons/Search";
import React, {useContext, useState} from "react";
import {GSettings, ProgressStatus} from "../../../types/types";
import {AppContext} from "../../../App";
import useGlobalStyles from "../styles";
import SliderSetting from "./SettingComponents/SliderSetting";
import ProgressIndicator from "./ProgressIndicator";
import GeneralSettings from "./GeneralSettings";
import AdvancedSettings from "./AdvancedSettings";


type Props = {
    searchField: string
    settings: GSettings
    onSettingChange: (settings: GSettings) => void
    onGenerate: (id: string) => void,
    progressStatus: ProgressStatus
    onUserSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const GraphSettings = ({searchField, settings, onGenerate, onSettingChange, progressStatus, onUserSearch}: Props) => {
    const classes = useGlobalStyles();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (prop: keyof GSettings) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof settings[prop] === "number") {
            onSettingChange({...settings, [prop]: parseFloat(event.target.value)});
        } else if (typeof settings[prop] === "boolean") {
            onSettingChange({...settings, [prop]: event.target.checked});
        } else {
            onSettingChange({...settings, [prop]: event.target.value});
        }
    };

    const handleSliderChange = (prop: keyof GSettings) => (event: any, newValue: number | number[]) => {
        onSettingChange({...settings, [prop]: newValue});
    }
    const inProgress = progressStatus.graph !== undefined || progressStatus.friends !== undefined || progressStatus.labels !== undefined

    return (
        <div
            style={{
                position: "absolute",
                zIndex: 9999
            }}
        >
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerOpen}
                style={{
                    marginLeft: "10px"
                }}
            >
                <MenuIcon fontSize="large"/>
            </IconButton>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <FormControl variant="outlined" className={classes.margin}>
                    <OutlinedInput
                        id="outlined-adornment-id"
                        labelWidth={0}
                        placeholder="Steam ID"
                        type="text"
                        value={searchField}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onUserSearch(event)
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon/>
                            </InputAdornment>
                        }
                        inputProps={{
                            className: classes.text,
                        }}
                    />
                </FormControl>
                <Divider/>
                <SliderSetting
                    label="Minimum degrees"
                    value={settings.minDegrees}
                    min={1}
                    max={10}
                    onChange={handleChange("minDegrees")}
                    onSliderChange={handleSliderChange("minDegrees")}
                />
                <Divider/>
                <div
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden",
                        height: "55vh"
                    }}
                >
                    <GeneralSettings
                        settings={settings}
                        handleChange={handleChange}
                        handleSliderChange={handleSliderChange}
                    />
                    <AdvancedSettings
                        settings={settings}
                        handleChange={handleChange}
                        handleSliderChange={handleSliderChange}
                    />
                </div>
                <div className={classes.drawerFooter} style={{height: "19vh"}}>
                    <Divider/>
                    {
                        !inProgress &&
                        <Button
                            className={classes.margin}
                            style={{
                                color: "#aaa",
                                borderColor: "#aaa",
                                height: "9vh",
                                marginTop: "6vh"
                            }}
                            variant="outlined"
                            onClick={() => {
                                onGenerate(searchField)
                            }}
                        >
                            Generate graph
                        </Button>
                    }
                    <List>
                        {
                            progressStatus.friends !== undefined &&
                            <ListItem>
                                <ProgressIndicator
                                    label={"Generating friendships"}
                                    complete={progressStatus.friends.complete}
                                />
                            </ListItem>
                        }
                        {
                            progressStatus.labels !== undefined &&
                            <ListItem>
                                <ProgressIndicator
                                    label={"Generating labels"}
                                    complete={progressStatus.labels.complete}
                                />
                            </ListItem>
                        }
                        {
                            progressStatus.graph !== undefined &&
                            <ListItem>
                                <ProgressIndicator
                                    label={"Laying out graph"}
                                    complete={progressStatus.graph.complete}
                                />
                            </ListItem>
                        }
                    </List>
                </div>
                <div className={classes.drawerFooter} style={{marginLeft: 10, paddingBottom: 5, textAlign: "left"}}>
                    <IconButton href="https://github.com/Zarux/SteamFriendGraphV3">
                        <GitHubIcon style={{color: "white"}}/>
                    </IconButton>
                </div>
            </Drawer>
        </div>
    )
}


export default GraphSettings
