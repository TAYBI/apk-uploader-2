import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Filesystem, Directory, Encoding, FilesystemPlugin, WriteFileOptions } from '@capacitor/filesystem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  // url = 'https://dw.uptodown.com/dwn/wVbxuVSX5LS-4E2iAhaoePSvKvjN2nMS_R8sCwnC3DA7I2xBko9i_iHepWiGnzDOQ_b76YTHM-czBgnTAbzbn6UDK1ivINnOYBrVzpLCdyslyntUzyk9dOskQ7WuBGla/TRrfSM5gVQdh2mBPIe0ppA7cND5Rg4ZJgyB6xWzsYh4GnFhh-L7s2Br2m7LgFJgYQRo6abkzNS0Q35GM_yFIb2WD2Dfz5QDl-6tyZyexFrgyGZppC7VRCYiaTr3uFF1w/sG9KpphwpS-q2Cks2VyFCnZjfILYG2eV5aovMa_uLLeYu6BSnXCA3twxBsbjDGDUYal1jVXLj0zmO3oHAWzO0QoXcjYkIGdrMxdNLVTjoyQ=/';

  url = ''

  constructor(private loadingController: LoadingController, private http: HttpClient) { }

  async download() {
    const loading = await this.loadingController.create({
      message: 'Exporting...',
      translucent: true
    });
    await loading.present();

    // link.click();
    this.http.get('http://10.0.2.2:8083/api/maj/apkOmagPointage', { responseType: 'text' }).subscribe(
      (res) => {
        this.url = res;
        console.log(this.url);

        // Create an anchor element
        const link = document.createElement('a');
        link.href = this.url;
        link.download = 'apkOmagPointage.apk'; // Specify the desired file name

        // Programmatically trigger the download
        link.click();

        loading.dismiss();
      },
      (error) => {
        console.error(error);
        loading.dismiss();
      }
    );


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
