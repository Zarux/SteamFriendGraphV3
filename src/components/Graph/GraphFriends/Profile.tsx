import {Avatar, createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import React from "react";
import {SteamProfile} from "../../../types/types";
import clsx from "clsx";

type Props = {
    profile?: SteamProfile
    root?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            width: 290,
            height: 48,
            backgroundColor: "#1C262F"
        },
        rootRoot: {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
            marginBottom: 10
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
            borderColor: "#57cbde"
        },
        steamOffline: {
            color: "#898989",
            borderColor: "#898989"
        }
    }),
);

const Profile = ({profile, root}: Props) => {
    const classes = useStyles();
    if (profile === undefined) {
        return <div/>
    }
    return (
        <div
            className={clsx(classes.root, (profile.personastate === 0 ? classes.steamOffline : classes.steamOnline), root && classes.rootRoot)}>
            <div style={{
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
                {profile?.personaname}
                <br />
                <span className={classes.extraText}>
                    {profile?.realname}
                </span>
            </div>
        </div>
    )
}

export default Profile
