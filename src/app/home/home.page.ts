import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Filesystem, Directory, Encoding, FilesystemPlugin, WriteFileOptions } from '@capacitor/filesystem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private loadingController: LoadingController) { }


  async download() {

  }
  async export() {
    const loading = await this.loadingController.create({
      message: 'Exporting...',
      translucent: true
    });
    await loading.present();
    await Filesystem.writeFile({
      path: 'daata.csv',
      data: '0123445544,4556677',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    }).then(async () => {
      await loading.dismiss();
    });
  }
}
