import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { ApibieroService } from '../Serv/apibiero.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogModifComponent } from '../dialog-modif/dialog-modif.component';
import { DialogBouteilleComponent } from '../dialog-bouteille/dialog-bouteille.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsager } from './../iusager';
import { ICellier } from './../icellier';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
    usager !: IUsager;
    cellier !: ICellier;

    //estEditable:boolean= false;
    
    displayedColumns: string[] = ["nom", "adresse", "action"];
    dataSource !: MatTableDataSource<ICellier>;

    @ViewChild(MatPaginator) paginator !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;

    constructor(private authServ:AuthService, private bieroServ:ApibieroService, public dialog: MatDialog ) { 

    }

    ngOnInit(): void {
        this.getMesCelliers();
        this.authServ.setTitre("Mes celliers");
    }

    /** Liste des celliers d'usager */
    getMesCelliers(){
        this.bieroServ.getCelliers()
        .subscribe({
            next:(res)=>{
                this.dataSource = new MatTableDataSource(res.data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error:(err)=>{
                alert("erreur")
            }
        })
    }

    /** Filtre */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /** Bouton Modifier la bouteille */
    editDialogCellier(cellier:ICellier): void {
        const dialogRef = this.dialog.open(DialogModifComponent, {
            width: '100%',
            maxWidth: '370px',
            data:cellier
        }).afterClosed().subscribe(res=>{
            this.getMesCelliers();
        });
        
    }

    /** Bouton Ajouter une bouteille */
    createDialogCellier(): void {
        this.getMesCelliers();
        this.dialog.open(DialogBouteilleComponent, {
            width: '100%',
            maxWidth: '370px',
            data: this.cellier
        }).afterClosed().subscribe(res=>{
            this.getMesCelliers();
        });
    }

    /** Bouton Modifier les informations de l'usager' */
    editDialogUsager(usager:IUsager): void {
        const dialogRef = this.dialog.open(DialogModifComponent, {
            width: '100%',
            maxWidth: '370px',
            data:usager
        }).afterClosed().subscribe(res=>{
            this.getMesCelliers();
        });
        
    }

    /** Bouton Modifier le mot de passe */
    editDialogMotPasse(usager:IUsager): void {
        const dialogRef = this.dialog.open(DialogModifComponent, {
            width: '100%',
            maxWidth: '370px',
            data:usager
        }).afterClosed().subscribe(res=>{
            this.getMesCelliers();
        });
        
    }
}
