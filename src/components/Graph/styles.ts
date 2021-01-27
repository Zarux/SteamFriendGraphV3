import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";

const drawerWidth = 350;

const useGlobalStyles = makeStyles((theme: Theme) => ({
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
    drawerHeaderRight: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        justifyContent: 'flex-start'
    },
    margin: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: 'rgb(170, 170, 170)',
        fontSize: '12px'
    },
    drawerFooter: {
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        paddingBottom: 50,
        width: "inherit"
    },
    drawerItem: {
        width: "90%",
        border: "1px solid #1C262F",
        backgroundColor: "#2a2c32",
        borderRadius: "2px",
        padding: "7px"
    },
    compactListItem: {
        paddingTop: 0,
        paddingBottom: 0
    },
    accordionBg: {
        backgroundColor: "inherit"
    }
}));

export default useGlobalStyles