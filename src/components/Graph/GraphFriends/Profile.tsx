import {createStyles, IconButton, makeStyles, Theme} from "@material-ui/core";
import React from "react";
import {SteamProfile} from "../../../types/types";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flex: {
            display: "flex",
        },
        root: {
            display: "flex",
            width: "270px",
            height: "48px",
            backgroundColor: "#1C262F"
        },
        rootRoot: {
            paddingLeft: "16px",
            marginTop: "10px",
            marginBottom: "10px"
        },
        textArea: {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            padding: "12px 12px 12px 12px",
            fontSize: "14px",
            lineHeight: "15px",
            paddingRight: "18px"
        },
        withExtraText: {
            padding: "7px 12px 12px 12px",
        },
        extraText: {
            fontWeight: "normal",
            fontSize: "11px"
        },
        steamOnline: {
            color: "#57cbde",
            borderColor: "#57cbde",
            '&:hover': {
                border: "1px solid #57cbde",
            },
        },
        steamOffline: {
            color: "#898989",
            borderColor: "#898989",
            '&:hover': {
                border: "1px solid #898989",
            },
        },
        hover: {
            '&:hover': {
                border: "1px solid gray",
            },
        },
        iconButton: {
            color: "white",
            width: "15px",
            padding: 0,
            paddingLeft: "15%"
        },
        icon: {
            width: "15px",
            height: "15px"
        }
    }),
);

type Props = {
    profile?: SteamProfile
    onHover: ((profileId: string) => void)[]
    onProfileSearch: (steamId: string) => void
    root?: boolean,
}

const Profile = ({profile, root, onHover, onProfileSearch}: Props) => {
    const classes = useStyles();
    if (profile === undefined) {
        return <div/>
    }
    return (
        <div className={clsx(classes.flex, root && classes.rootRoot)}>
            <div
                className={clsx(classes.root, (profile.personastate === 0 ? classes.steamOffline : classes.steamOnline))}
                onMouseEnter={() => {
                    onHover[0](profile?.steamid)
                }}
                onMouseLeave={() => {
                    onHover[1](profile?.steamid)
                }}
            >
                <div
                    style={{
                        borderRightStyle: "solid",
                        borderRightWidth: "4px"
                    }}>
                    <img
                        src={profile?.avatarmedium}
                        alt=""
                        style={{
                            height: 48,
                            width: 48
                        }}
                    />
                </div>
                <div
                    className={clsx(classes.textArea, profile?.realname && classes.withExtraText)}
                >
                    <div>
                        {profile?.personaname}
                        <br/>
                        <span className={classes.extraText}>
                        {profile?.realname}
                    </span>
                    </div>
                </div>
            </div>
            <div style={{
                width: 20,
                backgroundColor: "#1f1f1f"
            }}>
                <IconButton className={classes.iconButton} href={profile.profileurl}>
                    <LinkIcon className={classes.icon}/>
                </IconButton>
                <IconButton
                    className={classes.iconButton}
                    onClick={() => {
                        onProfileSearch(profile?.steamid)
                    }}
                >
                    <SearchIcon className={classes.icon}/>
                </IconButton>
            </div>
        </div>
    )
}

export default Profile
