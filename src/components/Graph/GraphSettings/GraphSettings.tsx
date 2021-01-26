import {
    IconButton,
    Drawer,
    Divider,
    FormControl,
    OutlinedInput,
    InputAdornment,
    Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import React, {useContext} from "react";
import {useState} from "react"
import SearchIcon from "@material-ui/icons/Search";
import {GSettings} from "../../../types/types";
import {AppContext} from "../../../App";
import useStyles from "../styles";
import SliderSetting from "./SettingComponents/SliderSetting";

type Props = {
    settings: GSettings
    onSettingChange: (settings: GSettings) => void
    onGenerate: (id: string) => void
}

const GraphSettings = ({settings, onGenerate, onSettingChange}: Props) => {
    const context = useContext(AppContext)
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [id, setId] = useState((context.url && context.url.searchParams.get("id")) || "")

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (prop: keyof GSettings) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof settings[prop] === "number") {
            onSettingChange({...settings, [prop]: parseInt(event.target.value)});
            return
        }
        onSettingChange({...settings, [prop]: event.target.value});
    };

    const handleSliderChange = (prop: keyof GSettings) => (event: any, newValue: number | number[]) => {
        onSettingChange({...settings, [prop]: newValue});
    }

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
            >
                <MenuIcon/>
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
                        value={id}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setId(event.target.value)
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
                    handleChange={handleChange("minDegrees")}
                    handleSliderChange={handleSliderChange("minDegrees")}
                />
                <div className={classes.drawerFooter}>
                    <Divider/>
                    <Button
                        className={classes.margin}
                        style={{
                            color: "#aaa",
                            borderColor: "#aaa",
                            height: "75px"
                        }}
                        variant="outlined"
                        onClick={() => {
                            onGenerate(id)
                        }}
                    >
                        Generate graph
                    </Button>
                </div>
                <Divider/>
            </Drawer>
        </div>
    )
}


export default GraphSettings
