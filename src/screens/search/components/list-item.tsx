import { Icon } from "@/components";
import { Document } from "@/types";
import { makeStyles } from "@/utils";
import moment from "moment";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ListItemProps {
  item: Document;
  onPress?: () => void;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { item, onPress } = props;
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{item.title}</Text>
        <Text style={styles.sublabel}>
          {moment(item?.createdAt).format("MMM DD, YYYY hh:mm:ss")}
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
  },
  sublabel: {
    fontSize: theme.fontSizes["body-small"],
  },
}));

export default ListItem;
