import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import AlarmAddIcon from "@material-ui/icons/AlarmAdd";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import axios from "axios";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
    rootMain: {
        paddingLeft: "5%",
        paddingTop: "5%",
        width: 250,
    },
    root: {
        maxWidth: 345,
        minWidth: "40%",
        height: "100%",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
}));

export default function RecipeReviewCard({ order }) {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = React.useState([0]);

    useEffect(() => {
        try {
            axios
                .get(
                    "http://localhost:8080/getProductsForOrderKitchen/" +
                        order.idOrder
                )
                .then((res) => {
                    const ordersDB = res.data;
                    setProducts(ordersDB);
                });
        } catch (err) {
            console.error(err.response);
        }
    }, [order.idOrder]);

    function addTime() {
        try {
            axios.put("http://localhost:8080/setAccepted/" + order.idOrder);
        } catch (err) {
            console.error(err.response);
        }
        window.location.reload(false);
    }

    function markFinished() {
        try {
            axios.put("http://localhost:8080/setFinished/" + order.idOrder);
        } catch (err) {
            console.error(err.response);
        }
        window.location.reload(false);
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div className={classes.rootMain}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <IconButton aria-label="settings" fontSize={"large"}>
                            <ReceiptIcon />
                        </IconButton>
                    }
                    title={"Comanda " + order.idOrder}
                />
                <div>
                    <CardContent>
                        <List>
                            {products.map((value) => {
                                const labelId = `checkbox-list-label-${value.ProductIdProduct}`;
                                return (
                                    <ListItem
                                        key={value.ProductIdProduct}
                                        role={undefined}
                                        dense
                                        button
                                        onClick={handleToggle(value)}
                                        width={300}
                                    >
                                        <ListItemIcon
                                            key={value.ProductIdProduct}
                                        >
                                            <Checkbox
                                                edge="start"
                                                checked={
                                                    checked.indexOf(value) !==
                                                    -1
                                                }
                                                key={value.ProductIdProduct}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            id={labelId}
                                            primary={value.Product.productName}
                                        />
                                        <ListItemSecondaryAction></ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </CardContent>
                </div>

                <CardActions disableSpacing>
                    {order.isPending ? (
                        <IconButton
                            aria-label="add to favorites"
                            className={clsx(classes.expand)}
                            onClick={addTime}
                        >
                            <AlarmAddIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            className={clsx(classes.expand)}
                            onClick={markFinished}
                        >
                            <DoneIcon />
                        </IconButton>
                    )}
                </CardActions>
            </Card>
        </div>
    );
}
