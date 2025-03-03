import {
    Card,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import PropTypes from "prop-types";

SettingsDisplay.propTypes = {
    values: PropTypes.array,
};

export function SettingsDisplay({values}) {
    return (
        <Card
            sx={{ background: "transparent", color: "white", boxShadow: "none" }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 16,
                }}
            >
                <TableContainer
                    style={{ background: "transparent" }}
                    component={Paper}
                >
                    <Table size="small" sx={{color: "white", borderColor: "white"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "white", borderColor: "white" }}>Type</TableCell>
                                <TableCell align="center" sx={{ color: "white", borderColor: "white" }}>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" sx={{ color: "white", borderColor: "white" }}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: "white", borderColor: "white" }}>
                                        {row.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Card>
    );
}
