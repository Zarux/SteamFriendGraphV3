import React from "react";
import useStyles from "../styles";
import {Divider, Drawer, IconButton, List, ListItem} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Profile from "./Profile";
import {FriendProfiles, SteamProfile} from "../../../types/types";

type Props = {
    friendProfiles: FriendProfiles
}

const GraphFriends = ({friendProfiles}: Props) => {
    const classes = useStyles();

    return (
        <div
            style={{
                position: "absolute",
                zIndex: 9999
            }}
        >
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={true}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeaderRight}>
                    <IconButton>
                        <ChevronRightIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <Profile profile={friendProfiles.profile} root={true}/>
                <Divider/>
                <List>
                    {friendProfiles.friends?.map((friend: SteamProfile) => {
                        return (
                            <ListItem key={friend.steamid} alignItems="flex-start">
                                <Profile profile={friend}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </div>
    )
}

export default GraphFriends
