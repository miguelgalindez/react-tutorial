import React, { Component } from "react"
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom"
import {
    AppBar,    
    Toolbar,
    IconButton,
    Typography,
    Hidden,
    Drawer,
    Divider,
    MenuList,
    MenuItem,
    CssBaseline
} from "@material-ui/core";

import {    
    Menu as MenuIcon
} from "@material-ui/icons"

import { withStyles } from "@material-ui/core/styles"

const drawerWidth = 240;

const styles = theme => {
    console.log("[layout/index] theme.mixins.toolbar", theme.mixins.toolbar)
    return {
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        menuButton: {
            marginRight: 20,
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing.unit * 3,
        },
        nested: {
            paddingLeft: theme.spacing.unit * 4,
        },
    }
};

class Layout extends Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, location: {pathname}, children, writers } = this.props;
        const { mobileOpen } = this.state
        const drawer = (
            <div>
                <Hidden xsDown>
                    <div className={classes.toolbar} />
                </Hidden>
                <Divider />
                <MenuList>
                    <MenuItem component={Link} to="/" selected={pathname==='/'}>
                        Home
                    </MenuItem>
                    <MenuItem component={Link} to="/writers" selected={pathname==='/writers'}>
                        Writers
                    </MenuItem>
                    <MenuList>
                        {writers.map(({id, name})=>{
                            const to=`/writers/${id}`
                            return (
                                <MenuItem
                                    key={id}
                                    className={classes.nested}
                                    component={Link}
                                    to={to}
                                    selected={pathname===to}
                                >
                                    {name}
                                </MenuItem>
                            )
                        })}
                    </MenuList>
                </MenuList>
            </div>
        );
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Responsive drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        )
    }
}
export default compose(
    withRouter,
    withStyles(styles)
)(Layout)

