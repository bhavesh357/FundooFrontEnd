import React from "react";
import {
  Grid,
  Typography,
  Card,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List,
  CardHeader,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

class Notes extends React.Component {
  render() {
    return (
      <Grid container className="note">
        <Grid item md={this.props.isDrawerOpen ? 12 : 10}>
          <Grid container spacing={2} className="note-row">
            <Grid item md={3}>
              <Card elevation={3} variant="outlined" className="note-card">
                <List class="note-content checklist">
                  {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem
                        key={value}
                        role={undefined}
                        className="list-item"
                        dense
                        button
                      >
                        <ListItemIcon className="list-item-icon">
                          <Checkbox
                            className="list-check-icon"
                            edge="start"
                            color="primary"
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary="testing testing testing testing teasting"
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments">
                            
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card elevation={3} variant="outlined" className="note-card">
              <CardHeader title={<Typography variant="h6">{'Title of the note'}</Typography>} titleTypographyProps="h2" className="card-title" />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
                </Typography>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card elevation={3} variant="outlined" className="note-card">
              <CardHeader title={<Typography variant="h6">{'Title of the note'}</Typography>} titleTypographyProps="h2" className="card-title" />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
                </Typography>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card elevation={3} variant="outlined" className="note-card">
              <CardHeader title={<Typography variant="h6">{'Title of the note'}</Typography>} titleTypographyProps="h2" className="card-title" />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
                </Typography>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card elevation={3} variant="outlined" className="note-card">
              <CardHeader title={<Typography variant="h6">{'Title of the note'}</Typography>} titleTypographyProps="h2" className="card-title" />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
                </Typography>
              </Card>
            </Grid>
            </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Notes;
