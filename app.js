/* ===============================
   BASEMAP
================================ */
const osm = new ol.layer.Tile({
  source: new ol.source.OSM()
});

/* ===============================
   HELPER VECTOR LAYER
================================ */
function createVectorLayer(url, strokeColor, fillColor, layerName, layerCategory) {
  const layer = new ol.layer.Vector({
    visible: false,
    source: new ol.source.Vector({
      url: url,
      format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: strokeColor,
        width: 2
      }),
      fill: new ol.style.Fill({
        color: fillColor
      })
    })
  });

  layer.set('name', layerName);
  layer.set('category', layerCategory);

  return layer;
}

/* ===============================
   HELPER LINE LAYER
   Untuk data garis seperti Garpan
================================ */
function createLineLayer(url, strokeColor, layerName, layerCategory) {
  const layer = new ol.layer.Vector({
    visible: false,
    source: new ol.source.Vector({
      url: url,
      format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: strokeColor,
        width: 3
      })
    }),
    zIndex: 999
  });

  layer.set('name', layerName);
  layer.set('category', layerCategory);

  return layer;
}

/* ===============================
   LPI LAYERS
================================ */
const lpiLayers = {
  10: createVectorLayer(
    'Data/GeoJson/LPI_10K.geojson',
    '#004c99',
    'rgba(0, 76, 153, 0.25)',
    'LPI 10K',
    'lpi'
  ),

  25: createVectorLayer(
    'Data/GeoJson/LPI_25K.geojson',
    '#0066cc',
    'rgba(0, 102, 204, 0.25)',
    'LPI 25K',
    'lpi'
  ),

  50: createVectorLayer(
    'Data/GeoJson/LPI_50K.geojson',
    '#3399ff',
    'rgba(51, 153, 255, 0.25)',
    'LPI 50K',
    'lpi'
  ),

  250: createVectorLayer(
    'Data/GeoJson/LPI_250K.geojson',
    '#66b3ff',
    'rgba(102, 179, 255, 0.25)',
    'LPI 250K',
    'lpi'
  )
};

/* ===============================
   LLN LAYERS
================================ */
const llnLayers = {
  50: createVectorLayer(
    'Data/GeoJson/LLN_50K.geojson',
    '#7b3294',
    'rgba(123, 50, 148, 0.25)',
    'LLN 50K',
    'lln'
  ),

  250: createVectorLayer(
    'Data/GeoJson/LLN_250K.geojson',
    '#984ea3',
    'rgba(152, 78, 163, 0.25)',
    'LLN 250K',
    'lln'
  ),

  500: createVectorLayer(
    'Data/GeoJson/LLN_500K.geojson',
    '#c2a5cf',
    'rgba(194, 165, 207, 0.25)',
    'LLN 500K',
    'lln'
  )
};

/* ===============================
   BATIMETRI
================================ */
const batimetriLayers = [
  createVectorLayer(
    'Data/GeoJson/Batimetri_2021.geojson',
    '#1b9e77',
    'rgba(27, 158, 119, 0.25)',
    'Batimetri 2021',
    'batimetri'
  ),

  createVectorLayer(
    'Data/GeoJson/Batimetri_2022.geojson',
    '#1b9e77',
    'rgba(27, 158, 119, 0.25)',
    'Batimetri 2022',
    'batimetri'
  ),

  createVectorLayer(
    'Data/GeoJson/Batimetri_2023.geojson',
    '#1b9e77',
    'rgba(27, 158, 119, 0.25)',
    'Batimetri 2023',
    'batimetri'
  ),

  createVectorLayer(
    'Data/GeoJson/Batimetri_2024.geojson',
    '#1b9e77',
    'rgba(27, 158, 119, 0.25)',
    'Batimetri 2024',
    'batimetri'
  ),

  createVectorLayer(
    'Data/GeoJson/Batimetri_2025.geojson',
    '#1b9e77',
    'rgba(27, 158, 119, 0.25)',
    'Batimetri 2025',
    'batimetri'
  )
];

/* ===============================
   LKI
================================ */
const lkiLayers = [
  createVectorLayer(
    'Data/GeoJson/LKI_2019.geojson',
    '#e6ab02',
    'rgba(230, 171, 2, 0.25)',
    'LKI 2019',
    'lki'
  ),

  createVectorLayer(
    'Data/GeoJson/LKI_2022.geojson',
    '#e6ab02',
    'rgba(230, 171, 2, 0.25)',
    'LKI 2022',
    'lki'
  )
];

/* ===============================
   GARPAN
   Satu checkbox untuk Garpan 2020 dan Garpan 2025
================================ */
const garpanLayers = [
  createVectorLayer(
    'Data/GeoJson/Garpan_2020.geojson',
    '#d95f02',
    'rgba(217, 95, 2, 0.25)',
    'Garpan 2020',
    'garpan'
  ),

  createLineLayer(
    'Data/GeoJson/Garpan_2025.geojson',
    '#ffff00',
    'Garpan 2025',
    'garpan'
  )
];

/* ===============================
   DEBUG SEMUA LAYER GARPAN
================================ */
garpanLayers.forEach(layer => {
  layer.getSource().on('featuresloadend', function () {
    console.log(layer.get('name') + ' loaded:', layer.getSource().getFeatures().length);
    console.log('Extent ' + layer.get('name') + ':', layer.getSource().getExtent());
  });

  layer.getSource().on('featuresloaderror', function () {
    console.error(layer.get('name') + ' gagal dimuat. Cek path/nama file.');
  });
});

/* ===============================
   MAP
================================ */
const map = new ol.Map({
  target: 'map',
  layers: [
    osm,
    ...Object.values(lpiLayers),
    ...Object.values(llnLayers),
    ...batimetriLayers,
    ...lkiLayers,
    ...garpanLayers
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([118, -2]),
    zoom: 5
  })
});

/* ===============================
   MENU FUNCTIONS
================================ */
function toggleMenu(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function toggleLPI(scale, checked) {
  lpiLayers[scale].setVisible(checked);
}

function toggleLLN(scale, checked) {
  llnLayers[scale].setVisible(checked);
}

function toggleBatimetri(el) {
  batimetriLayers.forEach(layer => layer.setVisible(el.checked));
}

function toggleLKI(checked) {
  lkiLayers.forEach(layer => layer.setVisible(checked));
}

/* ===============================
   TOGGLE GARPAN
   Menyalakan Garpan 2020 dan 2025 sekaligus
================================ */
function toggleGarpan(checked) {
  garpanLayers.forEach(layer => {
    layer.setVisible(checked);
  });

  if (checked) {
    setTimeout(() => {
      let combinedExtent = ol.extent.createEmpty();

      garpanLayers.forEach(layer => {
        const extent = layer.getSource().getExtent();

        if (!ol.extent.isEmpty(extent)) {
          ol.extent.extend(combinedExtent, extent);
        }
      });

      console.log('Extent gabungan Garpan:', combinedExtent);

      if (!ol.extent.isEmpty(combinedExtent)) {
        map.getView().fit(combinedExtent, {
          padding: [80, 80, 80, 80],
          duration: 1000,
          maxZoom: 10
        });
      } else {
        console.warn('Data Garpan kosong, belum terbaca, atau file masih loading.');
      }
    }, 3000);
  }
}

/* ===============================
   POPUP
================================ */
const popup = document.getElementById('popup');
const selector = document.getElementById('popup-selector');
const content = document.getElementById('popup-content');
const downloadData = document.getElementById('download-data');

const overlay = new ol.Overlay({
  element: popup,
  autoPan: true
});

map.addOverlay(overlay);

document.getElementById('popup-closer').onclick = () => {
  overlay.setPosition(undefined);
  popup.style.display = 'none';
  return false;
};

/* ===============================
   CLICK EVENT UNTUK GEOJSON
================================ */
map.on('singleclick', function (evt) {
  const hits = [];

  map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    if (!layer || !layer.getVisible()) return;

    const p = feature.getProperties();
    const layerName = layer.get('name') || 'Data';
    const category = layer.get('category') || 'data';

    let type = layerName;
    let html = '';

    /* ===== LPI ===== */
    if (category === 'lpi') {
      type = `${layerName} (1:${p.SKL || p.SKALA || '-'})`;

      html = `
        <b>Nomor Lembar Peta</b>: ${p.NLP || '-'}<br>
        <b>Skala</b>: ${p.SKL || p.SKALA || '-'}<br>
        <b>Tahun Survei</b>: ${p.THN || p.Tahun || '-'}<br>
        <b>Tahun Publikasi</b>: ${p.EDS || '-'}<br>
        <b>Referensi Datum</b>: ${p.DTH || '-'}<br>
        <b>Jenis Data</b>: Hasil survei oleh ${p.PLK || '-'}<br><br>
      `;
    }

    /* ===== LLN ===== */
    else if (category === 'lln') {
      type = `${layerName} (1:${p.SKL || p.SKALA || '-'})`;

      html = `
        <b>Nomor Lembar Peta</b>: ${p.NLP || '-'}<br>
        <b>Skala</b>: ${p.SKL || p.SKALA || '-'}<br>
        <b>Tahun Survei</b>: ${p.THN || p.Tahun || '-'}<br>
        <b>Tahun Publikasi</b>: ${p.EDS || '-'}<br>
        <b>Referensi Datum</b>: ${p.DTH || '-'}<br>
        <b>Jenis Data</b>: Hasil survei oleh ${p.PLK || '-'}<br><br>
      `;
    }

    /* ===== BATIMETRI ===== */
    else if (category === 'batimetri') {
      type = layerName;

      html = `
        <b>Hasil Survei Data Batimetri</b><br>
        Tahun: ${p.THN || p.Tahun || layerName.replace('Batimetri ', '') || '-'}<br><br>
      `;
    }

    /* ===== LKI ===== */
    else if (category === 'lki') {
      type = layerName;

      html = `
        <b>Data LKI</b><br>
        Tahun: ${p.THN || p.Tahun || layerName.replace('LKI ', '') || '-'}<br><br>
      `;
    }

    /* ===== GARPAN ===== */
    else if (category === 'garpan') {
      type = layerName;

      html = `
        <b>Data Garis Pantai Skala Besar</b><br>
        Tahun: ${p.THN || p.Tahun || layerName.replace('Garpan ', '') || '-'}<br><br>
      `;
    }

    hits.push({
      type: type,
      html: html
    });
  });

  if (!hits.length) {
    overlay.setPosition(undefined);
    popup.style.display = 'none';
    return;
  }

  selector.innerHTML = '';
  content.innerHTML = '';

  hits.forEach((h, i) => {
    const btn = document.createElement('div');
    btn.className = 'popup-btn';
    btn.textContent = h.type;

    btn.onclick = () => {
      document.querySelectorAll('.popup-btn')
        .forEach(b => b.classList.remove('active'));

      btn.classList.add('active');
      content.innerHTML = h.html;
    };

    selector.appendChild(btn);

    if (i === 0) {
      btn.classList.add('active');
      content.innerHTML = h.html;
    }
  });

  if (downloadData) {
    downloadData.style.display = 'none';
  }

  popup.style.display = 'block';
  overlay.setPosition(evt.coordinate);
});