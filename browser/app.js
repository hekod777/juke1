var app = angular.module('myApp',[]);




app.controller('mainCtrl', function ($scope,$http) {

	$scope.playing = false;
	$scope.playing2 = false;


	var audio = document.createElement('audio');
	$scope.play = function(song){
		if (!song)
			song = $scope.currentSong;

		audio.src = '/api/songs/'+song.id+'/audio';
		audio.load();
		audio.play();
		console.log(song);
		$scope.currentSong = song;
		$scope.playing = true;
		$scope.playing2 = true;
		//$scope.$render();
		console.log('playing ', $scope.playing);


		
	}

	$scope.pause = function(){
		audio.pause();
		$scope.playing2 = false;
	}

	$scope.backward = function(currentSong){
		//console.log('current is',currentSong);
		var length = $scope.album.songs.length;
		var base = $scope.album.songs[0].id;
		var last = $scope.album.songs[$scope.album.songs.length-1].id;
		var currentSongId = currentSong.id;

		if (currentSongId === base){
			currentSongId = last+1;
		}




		$http.get('/api/songs/' + ((currentSongId*1 - 1) +''))
			.then (function(previousSong){

				console.log('previousSong is ',previousSong);
				//$scope.currentSong = previousSong.data;
				$scope.play(previousSong.data);
			})
	}



	$scope.isCurrent = function(song)
	{
		console.log($scope.currentSong === song);
		return $scope.currentSong.id === song.id;
	}

	 $http.get('/api/albums/1')
	 .then(function(response){
	 	var albumFromServer = response.data;
	 	albumFromServer.imageUrl = '/api/albums/' + albumFromServer.id + '/image';
	 	$scope.album = albumFromServer;
	 	return $http.get('/api/albums/1/songs')
	 })
	 .then(function(response)
	 {
	 	console.log('the serve responded, ', response);
	 	$scope.album.songs = response.data;

	 }).catch(console.error.bind(console));



	 $scope.getArtists = function(song)
		{
			
				return song.artists.map(function(artist){
					return artist.name;
				}).join(', ');
			
		}

});
