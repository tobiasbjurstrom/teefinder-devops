import React from 'react';
import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';

const DetailsPresenter = observer(function DetailsRender(props) {
    return (
        <DetailsView model={props.model}  goBack={props.goBack}  />
    );
});

export default DetailsPresenter;