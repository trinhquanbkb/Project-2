import React from 'react'
import HorizontalLayout from '../../../layouts/HorizontalLayout'
import bg from '../../../assets/images/page_update.jpeg'

export default function PageFuture() {
	return (
		<HorizontalLayout>
			<div
				style={{
					marginTop: '70px',
					height: '800px',
					width: '100%',
					backgroundImage: `url('${bg}')`,
					backgroundSize: 'cover',
					marginBottom: '-70px'
				}}>
				<div
					style={{
						backgroundColor: 'rgba(0,0,0,0.6)',
						height: '800px',
						width: '100%'
					}}>
					<div
						style={{
							width: '60%',
							height: '100px',
							color: 'white',
							fontSize: '45px',
							margin: '0px auto',
							paddingTop: '300px',
							fontWeight: '700',
							textAlign: 'center'
						}}>
						Trang này hiện đang cập nhật các chức năng mới, vui lòng
						quay lại vào lần sau!
					</div>
				</div>
			</div>
		</HorizontalLayout>
	)
}
