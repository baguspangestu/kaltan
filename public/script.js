$(function () {

  // Konfigurasi
  const config = {
    periode: ['Per', 'Untuk periode yang berakhir'],
    type: [
      'Aktiva Lancar',
      'Investasi Jangka Panjang',
      'Aktiva Tetap Berwujud',
      'Aktiva Tak Berwujud',
      'Utang Jangka Pendek',
      'Utang Jangka Panjang',
      'Modal'
    ]
  }

  // Data Testing
  const data = {
    company: 'PD TELUK INDAH',
    periode: [1, "2002-12-31"],
    data: [
      ['Tanah (land)', 2, 28000000],
      ['Kas (cash)', 0, 19500000],
      ['Persediaan barang dagang (merchandise inventory)', 0, 22250000],
      ['Piutang dagang (account receivable)', 0, 15000000],
      ['Utang usaha (account payable)', 4, 10300000],
      ['Utang hipotek', 5, 15000000],
      ['Modal Tn Aryo (Mr. Aryo, capital)', 6, 63750000],
      ['Goodwill', 3, 3000000],
      ['Iklan dibayar dimuka (prepaid advertising)', 0, 1500000],
      ['Gedung (building)', 2, 25000000],
      ['Akum. Peny. Kendaraan', 2, 3500000],
      ['Kendaraan (automobile)', 2, 12250000],
      ['Akum. Peny. Gedung', 2, 5000000],
      ['Hak patent (patent)', 3, 1000000],
      ['Investasi dalam saham (investment on stock)', 1, 6000000],
      ['PPh ymh dibayar', 4, 2000000],
      ['Bunga diterima di muka (unearned interest inchome)', 4, 500000],
      ['Bunga ymh diterima (interest receivable)', 0, 500000],
      ['Utang obligasi (bond payable)', 5, 27750000],
      ['Gaji ymh dibayar (saleris payable)', 4, 5000000],
      ['Wesel bayar (notes payable)', 4, 10700000],
      ['Perlengkapan (suplies)', 0, 2000000],
      ['Wesel tagih (notes receivable)', 0, 7500000],
    ]
  };

  // Format Uang Rupiah
  function duit(a, b) {
    let x = 'Rp ' + a.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + ',-';

    if (akum(b)) x = '(' + x + ')';

    return x;
  }

  // Urutkan Data Sesuai Jenisnya
  function sort(a, b) {
    let x = [];

    for (let i = 0; i < b.length; i++) {
      x.push([]);
    }

    for (let i = 0; i < a.length; i++) {
      let z = a[i][1];
      x[z].push(i);
    }

    return x;
  }

  // Jumlahkan Uang di Masing-masing Jenis
  function math(a, b, c) {
    let x = 0;

    for (let i = 0; i < b[c].length; i++) {
      const s = a[b[c][i]][0];
      const n = parseInt(a[b[c][i]][2]);

      if (akum(s)) {
        x -= n;
      } else {
        x += n;
      }
    }

    return x;
  }

  // Urutkan Data untuk dijadikan Tabel
  function siap(a, b) {
    const c = sort(a, b);

    let m, n, o;
    let p = [0, 0];
    let x = [
      [],
      []
    ];

    for (let i = 0; i < c.length; i++) {
      for (let j = 0; j < c[i].length; j++) {
        if (i < 4) {
          if (j === 0) {
            m = b[i] + ' :';
            n = '';
            o = duit(math(a, c, i), '');
            p[0] += math(a, c, i);
            x[0].push([m, n, o]);
          }

          m = a[c[i][j]][0];
          n = duit(a[c[i][j]][2], a[c[i][j]][0]);
          o = '';
          x[0].push([m, n, o]);

          if (j === c[i].length - 1) {
            x[0].push(['&nbsp;', '', '']);
          }
        } else {
          if (j === 0) {
            m = b[i] + ' :';
            n = '';
            o = duit(math(a, c, i), '');
            p[1] += math(a, c, i);
            x[1].push([m, n, o]);
          }

          m = a[c[i][j]][0];
          n = duit(a[c[i][j]][2], a[c[i][j]][0]);
          o = '';
          x[1].push([m, n, o]);

          if (j === c[i].length - 1) {
            x[1].push(['&nbsp;', '', '']);
          }
        }
      }
    }

    if (x[0].length < x[1].length) {
      for (let i = x[0].length; i < x[1].length; i++) {
        x[0].push(['', '', '']);
      }
    } else if (x[1].length < x[0].length) {
      for (let i = x[1].length; i < x[0].length; i++) {
        x[1].push(['', '', '']);
      }
    }

    x[0].push(['Total Aktiva :', '', duit(p[0], '')]);
    x[1].push(['Total Utang & Modal :', '', duit(p[1], '')]);

    return x;
  }

  // Tanggal, Bulan, Tahun sesuai format Indonesia
  function date(a) {
    let x = '';
    if (a) {
      const d = new Date(a);
      const ye = new Intl.DateTimeFormat('id', {
        year: 'numeric'
      }).format(d);
      const mo = new Intl.DateTimeFormat('id', {
        month: 'long'
      }).format(d);
      const da = new Intl.DateTimeFormat('id', {
        day: '2-digit'
      }).format(d);
      x = da + ' ' + mo + ' ' + ye;
    }

    return x;
  }

  // Akumulasi detector
  function akum(a) {
    return (a.search("Akum") >= 0) ? true : false;
  }

  function result() {
    const a = data.data;
    const b = config.type;
    const c = siap(a, b)

    const com = data.company;
    const per = config.periode[data.periode[0]] + ' ' + date(data.periode[1]);

    let x;

    x = `
      <table id="hasil" class="border center">
        <tr class="b-bottom fs-16">
          <th colspan="6">${com}<br>NERACA<br>${per}</th>
        </tr>
        <tr class="ta-left fs-16">
          <th>AKTIVA</th>
          <th></th>
          <th class="b-right"></th>
          <th>UTANG & MODAL</th>
          <th></th>
          <th></th>
        </tr>
        <tr class="ta-left fs-12">
          <td>&nbsp;</td>
          <td></td>
          <td class="b-right"></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>`;

    for (let i = 0; i < c[0].length; i++) {
      x += '<tr class="ta-left fs-12">';

      // Aktiva
      if (c[0][i][2]) { // Jenis
        x += `
          <th>${c[0][i][0]}</th>
          <th></th>
          <th class="b-right">${c[0][i][2]}</th>`;
      } else { // Sub
        x += `
          <td>${c[0][i][0]}</td>
          <td>${c[0][i][1]}</td>
          <td class="b-right"></td>`;
      }

      // Utang & Modal
      if (c[1][i][2]) { // Jenis
        x += `
          <th>${c[1][i][0]}</th>
          <th></th>
          <th>${c[1][i][2]}</th>`;
      } else { // Sub
        x += `
          <td>${c[1][i][0]}</td>
          <td>${c[1][i][1]}</td>
          <td></td>`;
      }
      x += '</tr>';
    }

    x += '</table>';

    return x;
  }

  function select(a) {
    let x = '';

    for (let i = 0; i < a.length; i++) {
      x += '<option value="' + i + '">' + a[i] + '</option>';
    }

    return x;
  }

  function element() {
    const typ = config.type;

    const x = `
    <tr class="inputForm">
      <td><input name="items" type="text" placeholder="Item" required /></td>
      <td><input name="value" type="number" placeholder="0" required /></td>
      <td>
        <select name="jenis" required>
          <option selected disabled>-Pilih-</option>
          ${select(typ)}
        </select>
      </td>
      <td align="center">(<a href="javascript:void(0);" style="color:red;" class="delForm">✗</a>)</td>
    </tr>`;

    return x;
  }

  function start() {
    const com = data.company;
    const per = config.periode;

    const x = `
      <table id="quest" class="border center">
        <tbody id="tabForm">
          <tr>
            <th colspan="4" style="font-size: 48px;">Akuntansi</th>
          </tr>
          <tr class="b-top ta-left">
            <td colspan="4">
              <b>Nama Perusahaan :</b>
              <input name="company" type="text" placeholder="${com}" required />
            </td>
          </tr>
          <tr class="b-bottom ta-left">
            <td colspan="4">
              <b>Periode :</b>
              <select name="periode" required>
                ${select(per)}
              </select>
              <input name="date" type="date" required />
            </td>
          </tr>
          <tr class="ta-left">
            <th>Items</th>
            <th>Value</th>
            <th>Jenis</th>
            <th align="center">
              <button class="addForm">+</button>
            </th>
          </tr>
          ${element()}
          <tr class="b-top">
            <td colspan="4">
              <button class="pancal">Pancal</button>
              [<a href="javascript:void(0);" class="reset">Reset</a>]
              <span class="f-right fs-12" style="color: green;"><b>[v0.02 - Bug Fixed!]</b></span>
            </td>
          </tr>
        </tbody>
      </table>
      ${result()}
      <p align="center" class="fs-12">
        Version: 0.02<br>
        Kalkulator Akuntansi<br>
        &copy; 2021 Bagus Pangestu
      </p>`;
    return x;
  }

  $('#root').html(start());

  $('#tabForm').click(function (e) {
    if ($(e.target).hasClass('addForm')) {
      const a = $('#tabForm > tr');
      a.eq(a.length - 1).before(element());
    }

    if ($(e.target).hasClass('delForm')) {
      $(e.target).parent().parent().remove();
    }

    if ($(e.target).hasClass('pancal')) {
      data.company = $('[name=company]').val();
      data.periode = [parseInt($('[name=periode]').val()), $('[name=date]').val()];

      data.data = [];

      $('#tabForm > .inputForm').each(function (i) {
        let a = $('[name=items]').eq(i).val();
        let b = $('[name=jenis]').eq(i).val();
        let c = $('[name=value]').eq(i).val();

        a = a ? a : 'item ' + (i + 1);
        c = c ? c : 0;

        if (b) data.data.push([a, parseInt(b), c]);
      });

      console.log(data);

      if ($('#root > #hasil')) $('#root > #hasil').remove();
      $('#root > #quest').after(result());
    }

    if ($(e.target).hasClass('reset')) {
      location.reload();
    }
  });

});