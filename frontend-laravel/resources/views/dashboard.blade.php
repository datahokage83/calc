<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <title>Chart</title>

</head>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="#">CHART</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
    </div>
</nav>

<div>
    <div class="container">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Nama Lengkap</th>
                    <th scope="col">Email</th>
                    <th scope="col">Waktu Login</th>
                    <th scope="col">Waktu Logout</th>
                    <th scope="col">Beda Waktu (detik)</th>
                </tr>
            </thead>
            <tbody>
                @foreach($items as $item)
                <tr>
                    <td>{{$item['username']}}</td>
                    <td>{{$item['email']}}</td>
                    <td>{{date('Y-m-d h:i:s',strtotime($item['loginAt']))}}</td>
                    <td>{{date('Y-m-d h:i:s',strtotime($item['logoutAt']))}}</td>
                    <td>{{strtotime($item['logoutAt']) - strtotime($item['loginAt'])}}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <canvas id="chartUser"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<body>
    <script src="/js/bootstrap.min.js"></script>

    <script>
        const valueItems = JSON.parse('{!! json_encode($items) !!}');

        const user = []
        const diff = []
        let last = 0;

        valueItems.forEach(element => {
            const loginAt = Date.parse(element['loginAt'])
            const logoutAt = Date.parse(element['logoutAt'])
            const diffTime = parseInt((logoutAt - loginAt) / 1000)

            if (last <= diffTime) last = diffTime

            user.push(element['username'])
            diff.push(diffTime)
        });

        diff.push(last + (last / 3))

        const data = {
            labels: user,
            datasets: [{
                label: 'Lama Waktu Pengguna (detik) ',
                backgroundColor: 'rgb(120, 80, 140)',
                borderColor: 'rgb(120, 80, 140)',
                data: diff,
            }]
        }

        const config = {
            type: 'bar',
            data: data,
            options: {
                scale: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }

        const myChart = new Chart(
            document.getElementById('chartUser'),
            config
        );
    </script>
</body>

</html>