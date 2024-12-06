import MaterialTable from "@material-table/core";
import { Divider, TextField } from "@mui/material";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useEffect } from 'react';
import { useStyles } from "./CompanyCss";
import { postData, getData, serverURL } from "../../services/FetchNodeServices";
import Swal from 'sweetalert2';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function DisplayAllCompany() {
    const classes = useStyles();
    
    // State variables
    const [companies, setCompanies] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formError, setFormError] = useState({ filename: '' });
    const [icon, setIcon] = useState({ byte: '', filename: 'case.png' });

    useEffect(() => {
        fetchAllCompanies();
    }, []);

    // Fetch all companies from the server
    const fetchAllCompanies = async () => {
        const response = await getData('company/display_all');
        if (response.status) {
            setCompanies(response.data);
        } else {
            Swal.fire({
                icon: "error",
                text: response.message,
                toast: true,
            });
        }
    };

    // Open the dialog for editing a company
    const openDialog = (rowData) => {
        setSelectedCompany(rowData);
        setIcon({ byte: '', filename: `${serverURL}/images/${rowData.companypicture}` });
        setOpen(true);
    };

    // Close the dialog
    const closeDialog = () => {
        setOpen(false);
    };

    // Handle validation errors
    const handleError = (label, message) => {
        setFormError((prev) => ({ ...prev, [label]: message }));
    };

    // Clear selected company and errors
    const clearData = () => {
        setSelectedCompany(null);
        setIcon({ byte: '', filename: 'case.png' });
        setFormError({});
    };

    // Validate input data
    const validateData = () => {
        let error = false;
        if (!selectedCompany?.companyname) {
            handleError('companyname', "Company name should not be blank.");
            error = true;
        }
        if (icon.byte.length === 0) {
            handleError('filename', "Please choose an icon for the company.");
            error = true;
        }
        return error;
    };

    // Handle icon file change
    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setIcon({ byte: file, filename: file.name });
        handleError("filename", "");
    };

    // Edit company data
    const handleEditCompanyData = async () => {
        const error = validateData();
        if (!error) {
            const formData = new FormData();
            formData.append('companyid', selectedCompany.companyid);
            formData.append('icon', icon.byte);

            const response = await postData('company/edit_company_data', formData);
            if (response.status) {
                Swal.fire({
                    icon: "success",
                    text: response.message,
                    toast: true,
                });
                fetchAllCompanies();
                closeDialog();
                clearData();
            } else {
                Swal.fire({
                    icon: "error",
                    text: response.message,
                    toast: true,
                });
            }
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TitleComponent title="All Companies" />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{ width: '100%' }} />
                    </Grid>
                    <MaterialTable
                        title="Company List"
                        columns={[
                            { title: 'Company Name', field: 'companyname' },
                            { title: 'Owner Name', field: 'companyowner' },
                            { title: 'Address', field: 'companyaddress' },
                            { title: 'Email', field: 'email' },
                            { title: 'Mobile', field: 'mobile' },
                            { title: 'City', field: 'selectedCity' },
                            { title: 'State', field: 'selectedState' },
                            { title: 'Email', field: 'email id' },
                            { title: 'Contact Person', field: 'contectperson' },
                            { title: 'About Company', field: 'aboutcompany' },
                            { title: 'Registration No', field: 'ragistrationno' },
                            { title: 'Pancard', field: 'Pancard' },
                            { title: 'Password', field: 'password' },
                            { title: 'Verified', field: 'varified' },
                            {
                                title: 'Picture',
                                field: 'companypicture',
                                render: rowData => <img src={`${serverURL}/images/${rowData.companypicture}`} alt="company" style={{ width: 50 }} />
                            },
                        ]}
                        data={companies}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Company',
                                onClick: (event, rowData) => openDialog(rowData)
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            search: true,
                        }}
                    />
                </Grid>
                <Dialog open={open} onClose={closeDialog}>
                    <DialogTitle>Edit Company</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Company Name"
                            fullWidth
                            value={selectedCompany?.companyname || ''}
                            onChange={(e) => setSelectedCompany(prev => ({ ...prev, companyname: e.target.value }))}
                        />
                        <div>
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Icon
                                <input type="file" hidden onChange={handleIconChange} />
                            </Button>
                            <div>{icon.filename}</div>
                            <div className={formError.filename ? classes.errorText : classes.successText}>
                                {formError.filename}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditCompanyData} color="primary">Save</Button>
                        <Button onClick={closeDialog} color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

