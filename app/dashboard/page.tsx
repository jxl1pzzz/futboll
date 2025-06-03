"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Users, Calendar, CreditCard, LogOut, Target, CheckCircle, User } from "lucide-react"

interface Player {
  id: number
  name: string
  number: number
  position: string
  goals: number
  assists: number
  attendance: number
}

interface Payment {
  id: number
  month: string
  amount: number
  status: string
  dueDate: string
}

interface Training {
  id: number
  date: string
  time: string
  type: string
  attendance: boolean
}

export default function UserDashboard() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [mounted, setMounted] = useState(false)

  // Marcar como montado para evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const userType = localStorage.getItem("userType")
    const email = localStorage.getItem("userEmail")

    if (userType !== "user") {
      router.push("/")
      return
    }

    if (email) {
      setUserEmail(email)
    }
  }, [router, mounted])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userType")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("userName")
      router.push("/")
    }
  }

  // Si no está montado, mostrar loading
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  const players: Player[] = [
    { id: 1, name: "Elvis Rivas", number: 10, position: "Mediocampista", goals: 15, assists: 8, attendance: 95 },
    { id: 2, name: "Juan Pintado", number: 7, position: "Extremo", goals: 12, assists: 10, attendance: 88 },
    { id: 3, name: "Kevin Muñoz", number: 8, position: "Mediocampista", goals: 8, assists: 12, attendance: 92 },
    { id: 4, name: "Mateo Ortega", number: 1, position: "Portero", goals: 0, assists: 2, attendance: 98 },
    { id: 5, name: "Estiven Toledo", number: 9, position: "Delantero", goals: 20, assists: 5, attendance: 90 },
    { id: 6, name: "Mantis", number: 5, position: "Defensa", goals: 3, assists: 4, attendance: 85 },
    { id: 7, name: "Chino", number: 4, position: "Defensa", goals: 2, assists: 6, attendance: 93 },
  ]

  const payments: Payment[] = [
    { id: 1, month: "Diciembre 2024", amount: 50000, status: "Pagado", dueDate: "2024-12-05" },
    { id: 2, month: "Noviembre 2024", amount: 50000, status: "Pagado", dueDate: "2024-11-05" },
    { id: 3, month: "Octubre 2024", amount: 50000, status: "Pagado", dueDate: "2024-10-05" },
    { id: 4, month: "Enero 2025", amount: 50000, status: "Pendiente", dueDate: "2025-01-05" },
  ]

  const trainings: Training[] = [
    { id: 1, date: "2024-12-01", time: "16:00", type: "Entrenamiento Técnico", attendance: true },
    { id: 2, date: "2024-12-03", time: "16:00", type: "Entrenamiento Físico", attendance: true },
    { id: 3, date: "2024-12-05", time: "16:00", type: "Partido Amistoso", attendance: false },
    { id: 4, date: "2024-12-08", time: "16:00", type: "Entrenamiento Táctico", attendance: true },
    { id: 5, date: "2024-12-10", time: "16:00", type: "Entrenamiento Técnico", attendance: true },
  ]

  const attendanceRate = (trainings.filter((t) => t.attendance).length / trainings.length) * 100
  const pendingPayments = payments.filter((p) => p.status === "Pendiente").length
  const totalGoals = players.reduce((sum, player) => sum + player.goals, 0)
  const totalAssists = players.reduce((sum, player) => sum + player.assists, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 mr-3" />
              <div>
                <h1 className="text-xl font-bold">Academia de Fútbol Elite</h1>
                <p className="text-sm text-green-100">Bienvenido, {userEmail}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-green-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Asistencia</p>
                  <p className="text-2xl font-bold">{attendanceRate.toFixed(0)}%</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Goles Totales</p>
                  <p className="text-2xl font-bold">{totalGoals}</p>
                </div>
                <Target className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Asistencias</p>
                  <p className="text-2xl font-bold">{totalAssists}</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Pagos Pendientes</p>
                  <p className="text-2xl font-bold">{pendingPayments}</p>
                </div>
                <CreditCard className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="players">Jugadores</TabsTrigger>
            <TabsTrigger value="training">Entrenamientos</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Eventos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-semibold">Entrenamiento Técnico</p>
                        <p className="text-sm text-gray-600">Hoy 16:00 - Campo Principal</p>
                      </div>
                      <Badge>Hoy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-semibold">Partido vs Deportivo Cali</p>
                        <p className="text-sm text-gray-600">Sábado 15:00 - Estadio</p>
                      </div>
                      <Badge variant="secondary">Sábado</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logros Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Trophy className="h-8 w-8 text-yellow-600" />
                      <div>
                        <p className="font-semibold">¡Goleador del Mes!</p>
                        <p className="text-sm text-gray-600">15 goles en Noviembre</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-semibold">Asistencia Perfecta</p>
                        <p className="text-sm text-gray-600">100% en entrenamientos</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="players">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Plantilla de Jugadores
                </CardTitle>
                <CardDescription>Estadísticas de rendimiento del equipo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {players.map((player) => (
                    <Card key={player.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {player.number}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{player.name}</h3>
                              <p className="text-sm text-gray-600">{player.position}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Goles:</span>
                            <span className="font-semibold">{player.goals}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Asistencias:</span>
                            <span className="font-semibold">{player.assists}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Asistencia:</span>
                              <span className="font-semibold">{player.attendance}%</span>
                            </div>
                            <Progress value={player.attendance} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Entrenamientos Esta Semana</p>
                        <p className="text-2xl font-bold text-gray-900">5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Target className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Horas Entrenadas</p>
                        <p className="text-2xl font-bold text-gray-900">12.5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Trophy className="h-8 w-8 text-yellow-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Nivel de Intensidad</p>
                        <p className="text-2xl font-bold text-gray-900">Alta</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Historial de Entrenamientos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Asistencia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trainings.map((training) => (
                        <TableRow key={training.id}>
                          <TableCell>{training.date}</TableCell>
                          <TableCell>{training.time}</TableCell>
                          <TableCell>{training.type}</TableCell>
                          <TableCell>
                            {training.attendance ? (
                              <Badge className="bg-green-100 text-green-800">Asistió</Badge>
                            ) : (
                              <Badge variant="secondary">No asistió</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                        {userEmail.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="text-xl font-semibold">Usuario</h3>
                      <p className="text-gray-600">{userEmail}</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Posición Preferida:</label>
                        <p className="text-lg">Mediocampista</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Fecha de Ingreso:</label>
                        <p className="text-lg">15 de Enero, 2024</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Estado:</label>
                        <Badge className="ml-2 bg-green-100 text-green-800">Activo</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de la Temporada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <div className="text-sm text-gray-600">Goles</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <div className="text-sm text-gray-600">Asistencias</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">15</div>
                        <div className="text-sm text-gray-600">Partidos</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">92%</div>
                        <div className="text-sm text-gray-600">Asistencia</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Nivel Técnico</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Condición Física</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Conocimiento Táctico</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
