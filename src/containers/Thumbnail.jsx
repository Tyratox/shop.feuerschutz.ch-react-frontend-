import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LazyImage } from "react-lazy-images";

import { fetchAttachment } from "../actions/attachments";
import { getAttachmentById } from "../reducers";
import Placeholder from "../components/Placeholder";
import { borders } from "../utilities/style";

const StyledThumbail = styled.div`
  img {
    ${({ longerSide }) =>
      longerSide === "width"
        ? "width: 100%; height: auto;"
        : "height: 100%; width: auto;"};

    /*max-height: 100%;
    max-width: 100%;*/
    border-radius: ${borders.radius};
  }
`;

/**
 * Renders a thumbnail
 * @returns {Component} The component
 */
class Thumbnail extends React.PureComponent {
  componentWillMount = () => {
    const { id, fetchThumbnail, thumbnail } = this.props;

    if (id > 0 && !thumbnail) {
      fetchThumbnail();
    }
  };

  componentDidUpdate() {
    const { id, fetchThumbnail, thumbnail } = this.props;

    if (id > 0 && !thumbnail) {
      fetchThumbnail();
    }
  }

  render = () => {
    const { id, thumbnail, size = "feuerschutz_fix_width" } = this.props;

    const thumbnailUrl =
      thumbnail && thumbnail.mimeType && thumbnail.mimeType.startsWith("image/")
        ? thumbnail.sizes
          ? thumbnail.sizes[size]
            ? thumbnail.sizes[size].source_url
            : thumbnail.url
          : thumbnail.url
        : "";

    return (
      <StyledThumbail
        longerSide={
          thumbnail && thumbnail.width < thumbnail.height ? "height" : "width"
        }
      >
        {thumbnail && thumbnailUrl ? (
          <LazyImage
            src={thumbnailUrl}
            alt={thumbnail.caption}
            placeholder={({ imageProps, ref }) => (
              <div ref={ref}>
                <Placeholder block />
              </div>
            )}
            actual={({ imageProps }) => (
              <img
                {...imageProps}
                className={
                  thumbnail.width < thumbnail.height ? "b-height" : "b-width"
                }
                width={thumbnail.width}
                height={thumbnail.height}
              />
            )}
          />
        ) : (
          <Placeholder block />
        )}
      </StyledThumbail>
    );
  };
}

Thumbnail.propTypes = {
  id: PropTypes.number,
  size: PropTypes.string
};

const mapStateToProps = (state, { id }) => ({
  thumbnail: getAttachmentById(state, id)
});
const mapDispatchToProps = (dispatch, { id }) => ({
  /**
   * Fetches a thumbnail
   * @param {boolean} visualize Whether to visualize the progress
   * @returns {Promise} The fetch promise
   */
  fetchThumbnail(visualize = true) {
    return dispatch(fetchAttachment(id, visualize));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thumbnail);
