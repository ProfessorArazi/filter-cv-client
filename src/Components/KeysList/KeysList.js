import * as React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import FileIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function keysList(props) {
  return (
    <Grid item xs={12} md={6}>
      <Demo>
        <List>
          {props.list.map((item) => (
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon onClick={() => props.onDelete(item)} />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FileIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Demo>
    </Grid>
  );
}
