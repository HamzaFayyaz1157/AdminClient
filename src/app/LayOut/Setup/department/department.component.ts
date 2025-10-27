import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentService } from '../../../Services/SetUp/department/department.service';
import { PermissionService } from '../../../Services/Global/Permission/permission.service';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule,AgGridModule,CommonModule
    
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
   schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class DepartmentComponent implements OnInit {

 formGroup!: FormGroup;
  isSaving = false;
  isEdit = true;
  isSearchModalOpen = false;
  searchForm!: FormGroup; // New search form group
  
  rowData: any[] = []; // Data for ag-Grid
  columnDefs: any[] = []; // Column definitions
  defaultColDef: any; // Default column definitions
  rowHeight: number = 40; // Set desired row height



 
  formName: string = 'Department';
  xMode = 0 // 0 for new entry, 1 for edit
  userPermissions = {
    canView: false,
    canAddMore: false,
    canCancel: false,
    canSearch: false,
    canDelete: false,
    canSave: true,
    canEdit: true,
    canPrint: false,
    canClose: false
  };

  constructor(
   private PermissionService: PermissionService,
    private fb: FormBuilder,
    private DepartmentService: DepartmentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Fetch user permissions
    this.PermissionService.getPermissions().subscribe(permissions => {
      console.log('Received permissions:', permissions); // Log the permissions to debug
      this.userPermissions = permissions;
    });

    
  

    // Initialize form
    this.formGroup = this.fb.group({
      // Always initialize 'Code' with an empty string
      Id: ['', this.xMode === 0 ? [] : Validators.required],  // Conditionally apply Validators.required
      DepartmentName: ['', Validators.required] 
    });



    // Conditionally disable 'Code' control
  if (this.xMode === 0) {
    this.formGroup.get('Id')?.disable(); // Disable 'Code' control when xMode is 0
  }



// --------gridOninit---------------


  // Default column definitions for sorting, filtering, etc.
  this.defaultColDef = {
    sortable: true, // Enable sorting
    filter: true,   // Enable filtering
    floatingFilter: true,      // Shows floating filters
    resizable: true, // Enable resizing
    editable: false, // Set to true if you want inline editing
  };


 this.columnDefs = [
  { headerName: 'Id', field: 'id', filter: 'agTextColumnFilter', width:120 }, // Text filter for Code
  { headerName: 'DepartmentName	', field: 'departmentName', filter: 'agTextColumnFilter', width:400 }  // Text filter for Name
];


  }


  // Save method
  onSave() {
    if (this.formGroup.valid) {
      // Prepare the form data
      const formData = {
        Id: Number(this.formGroup.get('Id')?.value),
        DepartmentName: this.formGroup.get('DepartmentName')?.value,
        xMode: this.xMode 
      };
console.log('Data saved successfully!',formData )
      // Call the service method to save the data
       this.DepartmentService. saveDepartment(formData).subscribe(
        (response) => {
          console.log('Data saved successfully!', response);
          this.toastr.success(response.Message);

          // Load the generated code into the form
         
          this.formGroup.patchValue({
            Id: response.obj.id, // Assuming the response contains this structure
          });
        
 

          // Set the form controls to read-only after saving
          this.formGroup.get('Id')?.disable(); // Disable the Code field
          this.formGroup.get('DepartmentName')?.disable(); // Disable the Custgroupname field
          this.isSaving = true;
          this.isEdit = this.userPermissions.canEdit ? false : this.isEdit; 
        },

        (error) => {
          console.error('Error saving data', error);
          this.toastr.error('Operation failed.');
        }
      );
    } 
    
    else {
      console.log('Form is invalid.');
      this.toastr.error('Operation failed.');
    }
  }





  // Handling different form actions
  onView() { console.log('Form View!'); }
  onAddMore() {
    this.formGroup = this.fb.group({
      // Always initialize 'Code' with an empty string
     Id : ['', this.xMode === 0 ? [] : Validators.required],  // Conditionally apply Validators.required
      LocationName: ['', Validators.required] 
    });

    this.xMode=0
        this.isSaving = false; 
        if (this.xMode === 0) {
          this.formGroup.get('Id')?.disable(); // Disable 'Code' control when xMode is 0
        }
    
    console.log('Form AddMore!'); }
  onCancel() { console.log('Form Cancel!'); }
  onSearch() { 
    
    this.isSearchModalOpen = true; 
    console.log('Form Search!');
  

    this.DepartmentService.getRootMenus().subscribe(
      (response: any) => {
        console.log('row Data',response.obj )
          this.rowData = response.obj; // Assign the 'obj' from the response to rowData
          if (this.rowData.length === 0) {
            this.toastr.info('No records found.');
          }
        
      },
      (error) => {
        console.error('Error fetching data', error);
        this.toastr.error('Search failed.');
      }
    );
    
  
  }
  
  
  
  
    onDelete() { console.log('Form Delete!'); }
  onEdit() { 
    console.log('Form Edit!'); 
  this.xMode =1
  
  console.log(this.xMode)

  
  this.formGroup.get('DepartmentName')?.enable();
this.isEdit = true
  this.isSaving = this.userPermissions.canSave ? false : this.isSaving; 
  
  }
  onPrint() { console.log('Form Print!'); }
  onClose() { console.log('Form Close!'); }







  onRowDoubleClicked(event: any): void {
    const rowCode = event.data.id; // Extract the code from the clicked row
    console.log('Double clicked row code:', rowCode);

    // Call your API with the row code
    this. DepartmentService.getDepartmentById(rowCode).subscribe(
      (details) => {
        console.log('Fetched details:', details);
        this.xMode =1
        this.formGroup.get('Id')?.disable(); // Disable the Code field
          this.formGroup.get('DepartmentName')?.disable(); // Disable the Custgroupname field
          this.formGroup.patchValue({
            Id: details.obj.id, // Assuming the response contains this structure
            LocationName: details.obj.departmentName, // Assuming the response contains this structure
          });
          this.isSaving = true;

          this.isEdit = this.userPermissions.canEdit ? false : this.isEdit;
          this.isSearchModalOpen = false; 
        this.toastr.success(details.Message);
        // You can also process the details as needed here
      },
      (error) => {
        console.error('Error fetching details', error);
        this.toastr.error('Failed to fetch details.');
      }
    );
  }




}
