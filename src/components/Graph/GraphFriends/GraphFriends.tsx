import React, {useEffect, useState} from "react";
import useGlobalStyles from "../styles";
import {Divider, Drawer, IconButton, List, ListItem} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Profile from "./Profile";
import {FriendProfiles, SteamProfile} from "../../../types/types";

type Props = {
    friendProfiles: FriendProfiles
    onProfileHover: ((profileId: string) => void)[]
}

const GraphFriends = ({friendProfiles, onProfileHover}: Props) => {
    const classes = useGlobalStyles();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(friendProfiles.profile !== undefined)
    }, [friendProfiles])

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
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeaderRight}>
                    <IconButton onClick={() => {setOpen(false)}}>
                        <ChevronRightIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <Profile profile={friendProfiles.profile} root={true} onHover={onProfileHover}/>
                <Divider/>
                <List>
                    {friendProfiles.friends?.map((friend: SteamProfile) => {
                        return (
                            <ListItem key={friend.steamid} alignItems="flex-start">
                                <Profile
                                    profile={friend}
                                    onHover={onProfileHover}
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </div>
    )
}

export default GraphFriends
