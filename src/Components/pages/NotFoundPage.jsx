import React from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";

class NotFoundPage extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item md={12}>
        <Typography variant="h1">
            Page Not Found
        </Typography>
            <Typography variant="h4">Lost?</Typography>
            <Button color="primary" variant="outlined" onClick={()=> this.props.history.push('/dashboard/notes')}>Home</Button>
        </Grid>
      </Grid>
    );
  }
}

export default NotFoundPage;
