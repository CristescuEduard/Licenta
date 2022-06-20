import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RecipeReviewCard from "../../components/Cards/Cards";
import NavBarMain from "../../components/NavBarMain/NavBarMain";
import axios from "axios";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "1370px",
        border: "solid",
        height: "1000px",
        overflow: "auto",
    },
}));

export default function AutoGrid() {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const [isPending, setIsPending] = useState(1);

    useEffect(() => {
        try {
            axios
                .get("http://localhost:8080/filterOrders/" + isPending)
                .then((res) => {
                    const ordersDB = res.data;
                    setOrders(ordersDB);
                });
        } catch (err) {
            console.error(err.response);
        }
    }, [isPending]);

    function changeActive() {
        setIsPending(0);
    }

    function changePending() {
        setIsPending(1);
    }
    return (
        <div className="Grid">
            <NavBarMain />
            <div>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                >
                    <Button onClick={changeActive}>Active</Button>
                    <Button onClick={changePending}>Pending</Button>
                </ButtonGroup>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        {Array.from(orders).map((order) => (
                            <Grid item key={order.idOrder}>
                                <RecipeReviewCard order={order} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}
