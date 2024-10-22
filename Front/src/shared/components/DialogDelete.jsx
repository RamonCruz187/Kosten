import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export const DialogDelete = ({ open, handleClose, handleDelete, id }) => {
    return (
        <Dialog
            open={open}
            onClose={handleDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                ¿Estás seguro de proceder?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Esta acción pondrá en estado inactivo el paquete seleccionado.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">Cancelar</Button>
                <Button onClick={() => handleDelete( id ) } autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}