// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RNGooglePlaces from 'react-native-google-places';
import { connect } from 'react-redux';

import { FlatList, Image } from 'react-native';

import ContentModal from '../../../lib/js/app/components/contentModal';
import * as locationActions from '../../actions/locations.action';
import LocationSearchRow from '../../../lib/js/app/components/LocationSearch/locationSearchRow';
import LocationSearchHeader from '../../../lib/js/app/components/LocationSearch/locationSearchHeader';

class LocationSearch extends PureComponent {
	// eslint-disable-line
	constructor() {
		super();
		this.state = {
			search: '',
			predictions: [],
		};
	}

	componentWillReceiveProps() {
		const { search, predictions } = this.state;
		if (!this.props.visible && search.length > 0) {
			this.setState({
				search: '',
				predictions: [],
			});
		}
	}

	getLocations(search) {
		const { predictions } = this.state;
		this.setState(
			{
				search,
				predictions:
					this.state.search.length < 2 && predictions.length > 0
						? []
						: predictions,
			},
			() => {
				if (this.state.search.length > 1) {
					RNGooglePlaces.getAutocompletePredictions(this.state.search, {
						type: 'cities',
					})
						.then(results =>
							this.setState({
								predictions: results,
							}),
						)
						.catch(error => console.log(error.message));
				}
			},
		);
	}

	LookUpPlace(loc) {
		RNGooglePlaces.lookUpPlaceByID(loc)
			.then(place => {
				this.props.toggleView();
				this.props.dispatch(
					locationActions.addNewLocation({
						lat: place.latitude,
						lng: place.longitude,
						name: place.name,
					}),
				);
			})
			.catch(error => console.log(error.message));
	}

	_keyExtractor = (item, index) => {
		return index;
	};

	renderHeader = () => {
		return <LocationSearchHeader onChange={text => this.getLocations(text)} />;
	};

	render() {
		const { visible, toggleView } = this.props;
		return (
			<ContentModal
				visible={visible}
				toggleView={toggleView}
				content={
					<FlatList
						keyboardShouldPersistTaps="always"
						scrollEnabled={false}
						enableEmptySections
						data={this.state.predictions}
						keyExtractor={this._keyExtractor}
						renderItem={({ item }) => (
							<LocationSearchRow
								primaryText={item.primaryText}
								secondaryText={item.secondaryText}
								handleTap={e => this.LookUpPlace(e)}
								id={item.placeID}
							/>
						)}
						ListHeaderComponent={this.renderHeader}
						ListFooterComponent={() => (
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
