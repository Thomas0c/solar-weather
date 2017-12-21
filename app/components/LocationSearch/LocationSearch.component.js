// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RNGooglePlaces from 'react-native-google-places';
import { connect } from 'react-redux';

import {
  ListView,
  Image,
} from 'react-native';

import ContentModal from '../../../lib/js/app/components/contentModal';
import * as locationActions from '../../actions/locations.action';
import LocationSearchRow from '../../../lib/js/app/components/LocationSearch/locationSearchRow';
import LocationSearchHeader from '../../../lib/js/app/components/LocationSearch/locationSearchHeader';

class LocationSearch extends PureComponent { // eslint-disable-line
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      search: '',
      ds,
      predictions: ds.cloneWithRows([]),
    };
  }

  getLocations(search) {
    this.setState({
      search,
    }, () => {
      if (this.state.search.length < 2) {
        this.setState({
          predictions: this.state.predictions.cloneWithRows([]),
        });
      } else if (this.state.search.length > 1) {
        RNGooglePlaces.getAutocompletePredictions(this.state.search, {
          type: 'cities',
        }).then(results => this.setState({
          predictions: this.state.predictions.cloneWithRows(results),
        })).catch(error => console.log(error.message));
      }
    });
  }

  LookUpPlace(loc) {
    RNGooglePlaces.lookUpPlaceByID(loc)
      .then((place) => {
        this.props.toggleView();
        this.state.predictions = this.state.ds.cloneWithRows([]);
        this.props.dispatch(locationActions.addNewLocation({
          lat: place.latitude,
          lng: place.longitude,
          name: place.name,
        }));
      }).catch(error => console.log(error.message));
  }

  render() {
    const { visible, toggleView } = this.props;
    return (
      <ContentModal
        visible={visible}
        toggleView={toggleView}
        content={
          <ListView
            keyboardShouldPersistTaps="always"
            scrollEnabled={false}
            enableEmptySections
            dataSource={this.state.predictions}
            renderRow={
              rowData =>
                (<LocationSearchRow
                  primaryText={rowData.primaryText}
                  secondaryText={rowData.secondaryText}
                  handleTap={e => this.LookUpPlace(e)}
                  id={rowData.placeID}
                />)
              }
            renderHeader={() =>
              <LocationSearchHeader onChange={text => this.getLocations(text)} />}
            renderFooter={() => (
              <Image
                style={imageStyle}
                source={require('../../../assets/pwdgoogle.png')}
              />
            )}
          />
        }
      />
    );
  }
}

const imageStyle = {
  alignSelf: 'center',
  marginTop: 15,
  width: 120,
  resizeMode: 'contain',
};

LocationSearch.propTypes = {
  toggleView: PropTypes.func,
  visible: PropTypes.bool,
  authorized: PropTypes.bool,
  dispatch: PropTypes.func,
};

const mapStateToProps = ({ locations }) => ({ locations });
export default connect(mapStateToProps)(LocationSearch);
