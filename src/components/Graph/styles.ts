import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";

const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#2e3136"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        justifyContent: 'flex-end'
    },
    margin: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: 'white'
    },
    drawerFooter: {
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        paddingBottom: 50,
        width: "inherit"
    },
}));

export default useStyles