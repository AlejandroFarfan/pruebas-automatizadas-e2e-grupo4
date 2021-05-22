import * as $ from 'jquery'

export class DataReader {
  getDynamicData() {
    let mockarooApiKey = '1fdbd0e0';
    let url = `https://cors-anywhere.herokuapp.com/http://my.api.mockaroo.com/ghost3425-design-users.json?key=${mockarooApiKey}`;
    return new Promise((resolve, eject) => {
      $.ajax( {
        url: url,
        responseType:'application/json',
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        success: function(data) {
          resolve(data);
        },
        error: function(xhr, status, error) {
        }
      });
    })
  }
}
