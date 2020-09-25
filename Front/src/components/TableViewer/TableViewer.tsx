import {
  TableContainer,
  Button,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton
} from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import './TableViewer.scss';

interface Props {
  data: (string | number)[][];
  headers: (string | number)[];
  buttonTitle: string;
  onDel(id: string | number): void;
  onView(id: string | number): void;
  onCreate(): void;
}

const TableViewer: React.FC<Props> = (props) => (
  <TableContainer>
    <Button
      variant='contained'
      onClick={props.onCreate}
      startIcon={<AddIcon />}>
      {props.buttonTitle}
    </Button>
    <Table>
      <TableHead>
        {props.headers.map((header, index) => (
          <TableCell key={index}>{header}</TableCell>
        ))}
        <TableCell></TableCell>
      </TableHead>
      <TableBody>
        {props.data.map((row, rowIndex) => {
          return (
            <TableRow key={rowIndex}>
              {row.map((col, index) => (
                <TableCell key={index}>{col}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => props.onDel(rowIndex)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => props.onView(rowIndex)}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TableViewer;
