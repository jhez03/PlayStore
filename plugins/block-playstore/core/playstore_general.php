<?php
if ( ! class_exists( 'Playstore_General' )) {
	class Playstore_General {
		/**
		* @return array<int,array<string,mixed>>
		* @param mixed $args
		*/
		public static function get_news( $args = array() ): array {
			$default_args = array(
				'post_type'      => 'news',
				'posts_per_page' => 3,
				'post_status'    => 'publish',
				'orderby'        => 'date',
				'order'          => 'DESC',
			);

			$query_args = wp_parse_args( $args, $default_args );
			$query      = new WP_Query( $query_args );

			$news_posts = array();

			while ($query->have_posts()) {
				$query->the_post();

				$news_posts[] = array(
					'id'          => get_the_ID(),
					'title'       => get_the_title(),
					'url'         => get_permalink(),
					'thumbnail'   => get_the_post_thumbnail_url( get_the_ID(), 'medium' ),
					'date'        => get_the_date(),
					'excerpt'     => get_the_excerpt(),
					'short_title' => wp_trim_words( get_the_title(), 6, '...' ),
				);
			}
			wp_reset_postdata();

			return $news_posts;
		}
	}
}
