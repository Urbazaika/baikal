import React from 'react';

function ImageGallery() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src="https://img.magnific.com/free-photo/adorable-cat-lifestyle_23-2151593405.jpg?semt=ais_hybrid&w=740&q=80"
          alt="котик"
          style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}> Котик</p>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <img
          src="https://maltipooforyou.com/wp-content/uploads/2026/03/photo-2024-09-07-14-54-48.jpg"
          alt="мальтипу"
          style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}> Собака</p>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <img
          src="https://travelask.ru/system/images/files/001/073/766/wysiwyg/13.jpeg?1524238884"
          alt="мармозетка"
          style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}> Обезьянка</p>
      </div>
    </div>
  );
}

export default ImageGallery;