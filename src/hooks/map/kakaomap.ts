const { kakao } = window;

const changeAddress = (address, name, description, phoneNumber, ref) => {
  const mapOption = {
    center: new window.kakao.maps.LatLng(37.566696, 126.977942), // 지도의 중심좌표
    level: 4 // 지도의 확대 레벨
  };

  const map = new window.kakao.maps.Map(ref.current, mapOption);

  let geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(address, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      let cords = new kakao.maps.LatLng(result[0].y, result[0].x);

      let marker = new kakao.maps.Marker({
        map: map,
        position: cords
      });

      marker.setMap(map);

      let content = `
        <div style="width: 16rem; padding: .75rem; background: white; border: .5rem; border-radius: .5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: .5rem;">
            <h3 style="font-weight: 600; font-size: 1.125rem; font-color: #1F2937; line-height: 1.75rem">${name}</h3>
            <div id="close-overlay" style="font-weight: 700; cursor: pointer; padding: 0px 10px;">&#10005;</div>
          </div>
          <div style="font-color:#4B5563;">
            <p style="margin-bottom: .1rem; font-size: .875rem; overflow-wrap: break-word; text-wrap: wrap; word-break: keep-all;">${description}</p>
          </div>
          <button style="width:100%; margin-top:.75rem; border-radius: .5rem; background-color:black; text-align: center; padding: .5rem 1rem .5rem 1rem; color:white; cursor: pointer;">
             <a href=${`tel: ${phoneNumber}`} class="phone-number" style="margin-top: 5px; color: white; font-size: 14px; transition: all ease-in 0.2s">&#128222; : ${phoneNumber}</a>
          </button>
        </div>
      `;

      let customOverlay = new kakao.maps.CustomOverlay({
        position: cords,
        content: content,
        yAnchor: 1.35
      });

      customOverlay.setMap(map);

      map.setCenter(cords);

      kakao.maps.event.addListener(marker, 'click', function () {
        customOverlay.setMap(map);
      });

      document.querySelector('#close-overlay').addEventListener('click', () => {
        customOverlay.setMap(null);
      });
    }
  });
};

export default changeAddress;
