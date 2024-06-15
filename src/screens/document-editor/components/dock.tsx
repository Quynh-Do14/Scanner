import { makeStyles } from "@/utils";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

interface DockProps {
  onShare?: () => void;
  onCreateNewPage?: () => void;
  onPass?: () => void;
  onCreatePDF?: () => void;
}

const Dock: React.FC<DockProps> = (props) => {
  const { onShare, onCreateNewPage, onPass, onCreatePDF } = props;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <IconButton
        icon="file-pdf-box"
        size={20}
        onPress={onCreatePDF}
        mode="contained"
      />
      <IconButton icon="share" size={20} onPress={onShare} mode="contained" />
      <IconButton icon="lock" size={20} onPress={onPass} mode="contained" />
      <IconButton
        icon="newspaper-plus"
        size={20}
        onPress={onCreateNewPage}
        mode="contained"
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "100%",
    paddingVertical: theme.spacing(2),
    borderColor: theme.colors["border"],
  },
}));

export default Dock;
