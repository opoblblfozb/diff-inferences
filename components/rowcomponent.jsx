import { List } from "@material-ui/core"
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    paper: {
      margin: "auto 5px 5px auto",
      padding: "0",
      width: "400px",
      height: "230px",
      display: "inline-block",
    },
    div_row: {
      width: "820px",
      height: "240px",
    },
  });
  
export default function RowComponent({leftComponent, rightComponent}){
    const styles = useStyles();
    return (
      <div className={styles.div_row}>
      <Paper className={styles.paper}>{leftComponent}</Paper>
      <Paper className={styles.paper}>{rightComponent}</Paper>
      </div>
    )
  }