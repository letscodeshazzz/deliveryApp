// Create a real map component
const MapComponent = ({ location }) => {
    const mapRef = React.useRef(null);
  
    useEffect(() => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom: 15
        });
        
        new window.google.maps.Marker({
          position: location,
          map: map,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
        });
      }
    }, [location]);
  
    return <div ref={mapRef} style={{ height: '300px', width: '100%' }} />;
  };