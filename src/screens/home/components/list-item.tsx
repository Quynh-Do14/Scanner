import { Icon } from "@/components";
import { Document } from "@/types";
import { makeStyles } from "@/utils";
import moment from "moment";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ListItemProps {
  item: Document;
  onPress?: () => void;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { item, onPress } = props;
  const styles = useStyles();

  console.log(item.images);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={{ uri: item?.images[0] }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{item.title}</Text>
        <Text style={styles.sublabel}>
          {moment(item?.createdAt).format("MMM DD, YYYY hh:mm:ss")}
        </Text>
        <Text style={styles.page}>
          ( {item?.content?.length} {"page"} )
        </Text>
      </View>
      {item.password && <Icon name="eye" />}
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4),
    flexDirection: "row",
  },
  label: {
    fontSize: theme.fontSizes["label-large"],
    color: theme.colors["light"],
  },
  sublabel: {
    fontSize: theme.fontSizes["body-small"],
    color: theme.colors["light"],
  },
  page: {
    fontSize: theme.fontSizes["body-small"],
    color: theme.colors["light"],
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
}));

export default ListItem;
