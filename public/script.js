$(function () {
  const obj = {
    company: 'PD TELUK INDAH',
    periode: 'Untuk periode yang berakhir tanggal 31 Desember 2002',
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
    ],
    type: [
      'Aktiva Lancar',
      'Investasi Jangka Panjang',
      'Aktiva Tetap Berwujud',
      'Aktiva Tak Berwujud',
      'Utang Jangka Pendek',
      'Utang Jangka Panjang',
      'Modal'
    ]
  };

  function duit(a) {
    return 'Rp ' + a.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + ',-';
  }

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

  function math(a, b, c) {
    let x = 0;

    for (let i = 0; i < b[c].length; i++) {
      x += parseInt([a[b[c][i]][2]]);
    }

    return x;
  }

  function tbls(a, b) {
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
            o = duit(math(a, c, i));
            p[0] += math(a, c, i);
            x[0].push([m, n, o]);
          }

          m = a[c[i][j]][0];
          n = duit(a[c[i][j]][2]);
          o = '';
          x[0].push([m, n, o]);

          if (j === c[i].length - 1) {
            x[0].push(['&nbsp;', '', '']);
          }
        } else {
          if (j === 0) {
            m = b[i] + ' :';
            n = '';
            o = duit(math(a, c, i));
            p[1] += math(a, c, i);
            x[1].push([m, n, o]);
          }

          m = a[c[i][j]][0];
          n = duit(a[c[i][j]][2]);
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

    x[0].push(['Total Aktiva :', '', duit(p[0])]);
    x[1].push(['Total Utang & Modal :', '', duit(p[1])]);

    return x;
  }

  function run() {
    const a = obj.data;
    const b = obj.type;
    const c = tbls(a, b)

    let x;

    x = `
      <table class="border center">
        <tr class="b-bottom fs-16">
          <th colspan="6">${obj.company}<br>NERACA<br>${obj.periode}</th>
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
      x += `<tr class="ta-left fs-12">`;

      // Aktiva
      if (c[0][i][2]) {
        x += `
          <th>${c[0][i][0]}</th>
          <th></th>
          <th class="b-right">${c[0][i][2]}</th>`;
      } else {
        x += `
          <td>${c[0][i][0]}</td>
          <td>${c[0][i][1]}</td>
          <td class="b-right"></td>`;
      }

      // Utang & Modal
      if (c[1][i][2]) {
        x += `
          <th>${c[1][i][0]}</th>
          <th></th>
          <th>${c[1][i][2]}</th>`;
      } else {
        x += `
          <td>${c[1][i][0]}</td>
          <td>${c[1][i][1]}</td>
          <td></td>`;
      }
      x += `</tr>`;
    }

    x += `</table>`;

    console.log(c);
    return x;
  }

  const root = $('#root');
  root.html(run());
});